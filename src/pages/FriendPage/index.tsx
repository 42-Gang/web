import { useEffect } from 'react';

import { useSocket } from '@/api/socket';

export const FriendPage = () => {
  const { isConnected, connect, disconnect } = useSocket({
    path: 'status',
    handshake: '/ws/user',
    withToken: true,
  });

  useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <div>
      <p style={{ color: 'white' }}>
        Connection status: {isConnected ? 'Connected' : 'Disconnected'}
      </p>
      <p>friend</p>
    </div>
  );
};
