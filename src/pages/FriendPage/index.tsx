import { useEffect } from 'react';

import { useFriendsMe } from '@/api/queries';
import { useSocket } from '@/api/socket';
import { Flex } from '@/components/system';
import { RequestListDialog } from '@/pages/FriendPage/components/request-list-dialog';

import * as styles from './styles.css';

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
    <Flex direction="column" alignItems="center" style={{ height: '100%' }}>
      <h1 className={styles.title}>Friend List</h1>

      <div className={styles.inputContainer}>
        <input className={styles.input} placeholder="Search friends" />

        <RequestListDialog>
          <button style={{ position: 'absolute', right: '-32px', color: 'white' }}>종</button>
        </RequestListDialog>
      </div>

      {friendList.map((friend) => (
        <div key={friend.friendId}>
          <p style={{ color: 'white' }}>{friend.nickname}</p>
        </div>
      ))}
    </Flex>
  );
};
