import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useUsersMe } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { ChatMessageResponse } from '@/api/types';

import { useSocket } from './useSocket';

export const useChatSocket = () => {
  const queryClient = useQueryClient();
  const { data: me } = useUsersMe();
  const [searchParams] = useSearchParams();

  const _friend = searchParams.get('friend');
  const friend = _friend ? parseInt(_friend, 10) : null;

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
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.chats._def, refetchType: 'all' }),
      ]);

      if (!me || data.userId === me.data.id) return;
      if (friend && data.userId === friend) return;

      toast.info(`${data.nickname}: ${data.contents}`);
    };

    socket.on('message', handleChatMessage);
    return () => {
      socket.off('message', handleChatMessage);
    };
  }, [socket, queryClient, me, friend]);
};
