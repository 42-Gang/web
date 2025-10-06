import { type UseSocketOptions, useSocket } from '~/socket';

export const useGameInviteSocket = (options?: Partial<UseSocketOptions>) => {
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
