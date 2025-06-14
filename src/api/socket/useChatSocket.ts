import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useUsersMe } from '@/api';
import { ChatMessageResponse } from '@/api/types';
import { PATH } from '@/constants';

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = async (data: ChatMessageResponse) => {
      if (!me || data.userId === me.data.id) return;
      if (friend && data.userId === friend) return;

      toast.info(`${data.nickname}: ${data.contents}`, {
        action: {
          label: 'Open',
          onClick: () => {
            navigate(`${PATH.FRIEND_CHATROOM}?friend=${data.userId}`, { replace: true });
          },
        },
      });
    };

    socket.on('message', handleChatMessage);
    return () => {
      socket.off('message', handleChatMessage);
    };
  }, [socket, queryClient, me, friend, navigate]);
};
