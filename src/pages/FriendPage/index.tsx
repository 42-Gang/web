import { useEffect, useMemo, useState } from 'react';

import { useFriendsMe } from '@/api';
import { useSocket } from '@/api/socket';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';
import { DialogWrapper } from '@/components/ui/popup-dialog/index.tsx';

import { FriendList } from './components/friend-list';
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
        <DialogWrapper type="addFriend" contentClassName={styles.fixedDialogContent}>
          <button className={styles.addFriend} />
        </DialogWrapper>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            placeholder="Please enter your friend's nickname."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <DialogWrapper type="alarm" contentClassName={styles.fixedDialogContent}>
        <button className={styles.alarm} />
      </DialogWrapper>
      <div className={styles.separatorLine} />
      <FriendList friends={filteredFriends} />
    </Flex>
  );
};
