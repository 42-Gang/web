import { useEffect } from 'react';

import { UserStatus } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';

import { useSocket } from './useSocket';

export const useStatusSocket = () => {
  const { updateStatus } = useStatusAtom();

  const { socket, connect, disconnect } = useSocket({
    path: 'status',
    handshake: '/ws/user',
    withToken: true,
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (!socket) return;

    const handleStatusUpdate = (data: UserStatus) => {
      updateStatus(data);
    };

    socket.on('friend-status', handleStatusUpdate);
    return () => {
      socket.off('friend-status', handleStatusUpdate);
    };
  }, [socket, updateStatus]);
};
