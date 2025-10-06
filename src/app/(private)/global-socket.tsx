'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useUsersMe } from '~/api/queries';
import { queryKeys } from '~/api/queryKey';
import { routes } from '~/constants/routes';
import { useChatSocket, useFriendSocket, useGameInviteSocket, useStatusSocket } from '~/socket';

export const GlobalSocket = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: me } = useUsersMe();

  const { on: onFriend } = useFriendSocket();
  const { on: onGameInvite } = useGameInviteSocket();
  const { on: onChat } = useChatSocket();
  const { on: onStatus } = useStatusSocket();

  useEffect(() => {
    const friendRequest = onFriend('friend-request', async data => {
      console.log('[global-socket] Friend request received:', data);

      toast.info(`${data.fromUserNickname} sent you a friend request!`);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' }),
      ]);
    });

    const friendAccept = onFriend('friend-accept', async data => {
      console.log('[global-socket] Friend accept received:', data);

      toast.success(`${data.toUserNickname} accepted your friend request!`);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' }),
      ]);
    });

    return () => {
      friendRequest();
      friendAccept();
    };
  }, [onFriend, queryClient]);

  useEffect(() => {
    const customInvite = onGameInvite('custom-invite', data => {
      console.log('[global-socket] Custom invite received:', data);

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

    return () => {
      customInvite();
    };
  }, [onGameInvite, router]);

  useEffect(() => {
    const message = onChat('message', data => {
      console.log('[global-socket] Chat message received:', data);

      if (!me?.data) return;
      if (data.userId === me.data.id) return;

      const friendIdParam = searchParams.get('friendId');
      const friendId = friendIdParam ? Number.parseInt(friendIdParam, 10) : null;

      if (friendId && friendId === data.userId) return;

      toast.info(`${data.nickname}: ${data.contents}`, {
        action: {
          label: 'Open',
          onClick: () => router.push(`/${routes.friend_chatroom}?friendId=${data.userId}`),
        },
      });
    });

    return () => {
      message();
    };
  }, [onChat, me, searchParams, router]);

  useEffect(() => {
    const friendStatus = onStatus('friend-status', data => {
      console.log('[global-socket] Friend status changed:', data);
    });

    return () => {
      friendStatus();
    };
  }, [onStatus]);

  return null;
};
