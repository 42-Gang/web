import { type UseSocketOptions, useSocket } from './useSocket';

export const useFriendSocket = (options?: Partial<UseSocketOptions>) => {
  return useSocket({
    path: '/ws/user',
    namespace: '/friend',
    withAuth: true,
    autoConnect: true,
    autoDisconnect: false,
    autoReconnect: true,
    ...options,
  });
};
