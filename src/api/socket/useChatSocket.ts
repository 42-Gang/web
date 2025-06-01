import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { queryKeys } from '@/api/queryKey';
import { ChatMessageResponse } from '@/api/types';

import { useSocket } from './useSocket';

export const useChatSocket = () => {
  const queryClient = useQueryClient();

  const { socket, connect, disconnect } = useSocket({
    path: 'chat',
    handshake: '/ws/chat',
    withToken: true,
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = async (data: ChatMessageResponse) => {
      toast.info(`${data.nickname}: ${data.contents}`);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.chats._def, refetchType: 'all' }),
      ]);
    };

    socket.on('message', handleChatMessage);
    return () => {
      socket.off('message', handleChatMessage);
    };
  }, [socket, queryClient]);
};
