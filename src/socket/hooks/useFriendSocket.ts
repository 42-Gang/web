import { type UseSocketOptions, useSocket } from '~/socket';

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
