import { useEffect } from 'react';

import { useFriendsMe } from '@/api/queries';
import { useSocket } from '@/api/socket';

export const FriendPage = () => {
  const { connect, disconnect } = useSocket({
    path: 'status',
    handshake: '/ws/user',
    withToken: true,
  });

  useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  const { data: friends } = useFriendsMe();
  const friendList = friends?.data?.friends || [];

  return (
    <div>
      <h1 style={{ color: 'white' }}>Friend List</h1>

      <input />

      {friendList.map((friend) => (
        <div key={friend.friendId}>
          <p style={{ color: 'white' }}>{friend.nickname}</p>
        </div>
      ))}
    </div>
  );
};
