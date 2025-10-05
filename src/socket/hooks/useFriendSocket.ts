import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { queryKeys } from '~/api/queryKey';
import { type UseSocketOptions, useSocket } from './useSocket';

export const useFriendSocket = (options?: Partial<UseSocketOptions>) => {
  const queryClient = useQueryClient();

  const socket = useSocket({
    path: '/ws/user',
    namespace: '/friend',
    withAuth: true,
    autoConnect: true,
    autoDisconnect: false,
    autoReconnect: true,
    ...options,
  });

  useEffect(() => {
    const friendRequest = socket.on('friend-request', async data => {
      console.log('[useFriendSocket] Friend request received:', data);

      toast.info(`${data.fromUserNickname} sent you a friend request!`);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' }),
      ]);
    });

    const friendAccept = socket.on('friend-accept', async data => {
      console.log('[useFriendSocket] Friend accept received:', data);

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
  }, [socket.on, queryClient]);

  return socket;
};
