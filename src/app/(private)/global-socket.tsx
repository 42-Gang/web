'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useUsersMe } from '~/api/queries';
import { queryKeys } from '~/api/queryKey';
import { routes } from '~/constants/routes';
import { useChatSocket, useFriendSocket, useGameInviteSocket, useStatusSocket } from '~/socket';
import { updateFriendStatusAtom } from '~/stores/friend-status';

export const GlobalSocket = () => {
  const qc = useQueryClient();
  const router = useRouter();
  const params = useSearchParams();
  const { data: me } = useUsersMe();
  const updateStatus = useSetAtom(updateFriendStatusAtom);

  const friendSocket = useFriendSocket();
  const gameSocket = useGameInviteSocket();
  const chatSocket = useChatSocket();
  const statusSocket = useStatusSocket();

  useEffect(() => {
    if (!friendSocket.socket || !friendSocket.isConnected) return;

    const req = friendSocket.on('friend-request', async data => {
      console.log('[global-socket] Friend request:', data);
      toast.info(`${data.fromUserNickname} sent you a friend request!`);

      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' }),
        qc.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' }),
      ]);
    });

    const accept = friendSocket.on('friend-accept', async data => {
      console.log('[global-socket] Friend accepted:', data);
      toast.success(`${data.toUserNickname} accepted your friend request!`);

      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' }),
        qc.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' }),
      ]);
    });

    return () => {
      req();
      accept();
    };
  }, [friendSocket.socket, friendSocket.isConnected, qc, friendSocket.on]);

  useEffect(() => {
    if (!gameSocket.socket || !gameSocket.isConnected) return;

    const invite = gameSocket.on('custom-invite', data => {
      console.log('[global-socket] Game invite:', data);

      toast.info(`${data.hostName}님이 초대했습니다. 수락하시겠습니까?`, {
        action: {
          label: 'Yes',
          onClick: () => {
            if (data.tournamentSize && data.tournamentSize > 2) {
              router.push(
                `/${routes.game_lobby_custom}?mode=tournament&size=${data.tournamentSize}&roomId=${data.roomId}`,
              );
            } else {
              router.push(`/${routes.game_lobby_custom}?mode=1vs1&roomId=${data.roomId}`);
            }
          },
        },
        cancel: {
          label: 'No',
          onClick: () => undefined,
        },
        duration: 10000,
      });
    });

    return () => invite();
  }, [gameSocket.socket, gameSocket.isConnected, router, gameSocket.on]);

  useEffect(() => {
    if (!chatSocket.socket || !chatSocket.isConnected) return;

    const msg = chatSocket.on('message', data => {
      console.log('[global-socket] Chat message:', data);

      if (!me?.data) return;
      if (data.userId === me.data.id) return;

      const fidParam = params.get('friendId');
      const fid = fidParam ? Number.parseInt(fidParam, 10) : null;

      if (fid && fid === data.userId) return;

      toast.info(`${data.nickname}: ${data.contents}`, {
        action: {
          label: 'Open',
          onClick: () => router.push(`/${routes.friend_chatroom}?friendId=${data.userId}`),
        },
      });
    });

    return () => msg();
  }, [chatSocket.socket, chatSocket.isConnected, me, params, router, chatSocket.on]);

  useEffect(() => {
    if (!statusSocket.socket || !statusSocket.isConnected) return;

    const status = statusSocket.on('friend-status', data => {
      console.log('[global-socket] Friend status:', data);
      updateStatus(data);
    });

    return () => status();
  }, [statusSocket.socket, statusSocket.isConnected, updateStatus, statusSocket.on]);

  return null;
};
