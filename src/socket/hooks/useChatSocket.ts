import { type UseSocketOptions, useSocket } from './useSocket';

export const useChatSocket = (options?: Partial<UseSocketOptions>) => {
  return useSocket({
    path: '/ws/chat',
    namespace: '/chat',
    withAuth: true,
    autoConnect: true,
    autoDisconnect: false,
    autoReconnect: true,
    ...options,
  });
};
