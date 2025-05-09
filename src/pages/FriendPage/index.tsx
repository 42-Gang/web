import { useSocket } from '@/api/socket/useSocket';

export const FriendPage = () => {
  const { socket, isConnected } = useSocket({
    path: 'status',
    handshake: '/ws/user',
    withToken: true,
  });

  socket.connect();

  return (
    <div>
      <p>Connection status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <p>friend</p>
    </div>
  );
};
