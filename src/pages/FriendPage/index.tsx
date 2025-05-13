import { useEffect, useMemo, useState } from 'react';

import { useFriendsMe } from '@/api/index.ts';
import { useSocket } from '@/api/socket';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import { AddFriend } from './components/add-friend/index.tsx';
import { FriendList } from './components/friend-list/index.tsx';
import { RequestListDialog } from './components/request-list-dialog';
import * as styles from './styles.css.ts';

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

  const friendList = useMemo(() => friends?.data?.friends || [], [friends]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = useMemo(() => {
    return friendList.filter((friend) =>
      friend.nickname.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );
  }, [friendList, searchTerm]);

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.Title}>Friend List</h2>

      <div className={styles.FriendContainer}>
        <RequestListDialog content={<AddFriend />}>
          <button className={styles.addFriend} />
        </RequestListDialog>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            placeholder="Please enter your friend's nickname."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.alarm} />
      <div className={styles.separatorLine} />
      <FriendList friends={filteredFriends} />
    </Flex>
  );
};
