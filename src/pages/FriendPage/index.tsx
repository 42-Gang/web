import { io } from 'socket.io-client';

import { useAuthAtom } from '@/atoms/useAuthAtom.ts';

export const FriendPage = () => {
  const { token } = useAuthAtom();

  const socket = io(`https://217.142.135.254/status?token=${token}`, {
    path: `/ws/user`,
    autoConnect: false,
    transports: ['websocket'],
  });

  socket.connect();

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
  });

  return <>friend</>;
};
