import { type UseSocketOptions, useSocket } from '~/socket';

export const useStatusSocket = (options?: Partial<UseSocketOptions>) => {
  return useSocket({
    path: '/ws/user',
    namespace: '/status',
    withAuth: true,
    autoConnect: true,
    autoDisconnect: false,
    autoReconnect: true,
    ...options,
  });
};
