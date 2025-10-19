import { type UseSocketOptions, useSocket } from '~/socket';

export const useMainGameSocket = (options?: Partial<UseSocketOptions>) => {
  return useSocket({
    path: '/ws/main-game',
    namespace: '/waiting',
    withAuth: true,
    autoConnect: true,
    autoDisconnect: false,
    autoReconnect: true,
    ...options,
  });
};
