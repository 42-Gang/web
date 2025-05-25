import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { queryKeys } from '@/api/queryKey';
import type { FriendAcceptStatus, FriendRequestStatus } from '@/api/types';

import { useSocket } from './useSocket';

export const useFriendSocket = () => {
  const queryClient = useQueryClient();

  const { socket, connect, disconnect } = useSocket({
    path: 'friend',
    handshake: '/ws/user',
    withToken: true,
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (!socket) return;

    const handleFriendAcceptUpdate = async (data: FriendAcceptStatus) => {
      toast.success(`${data.toUserNickname} accepted your friend request!`);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.friendsMe()._def],
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.friendsRequests()._def],
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.usersSearch({
              nickname: '',
              exceptMe: true,
              status: ['NONE'],
            })._def,
          ],
          refetchType: 'all',
        }),
      ]);
    };

    const handleFriendRequestUpdate = async (data: FriendRequestStatus) => {
      toast.info(`${data.fromUserNickname} sent you a friend request!`);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.friendsRequests()._def],
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.usersSearch({
              nickname: '',
              exceptMe: true,
              status: ['NONE'],
            })._def,
          ],
          refetchType: 'all',
        }),
      ]);
    };

    socket.on('friend-accept', handleFriendAcceptUpdate);
    socket.on('friend-request', handleFriendRequestUpdate);
    return () => {
      socket.off('friend-accept', handleFriendAcceptUpdate);
      socket.off('friend-request', handleFriendRequestUpdate);
    };
  }, [socket, queryClient]);
};
