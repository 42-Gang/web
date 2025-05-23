import { useEffect, useState } from 'react';
import { useDebounce } from 'react-simplikit';

import { useFriendsMe } from '@/api';
import { socketPubSub } from '@/api/socket';
import { Flex } from '@/components/system';
import { BackButton, Divider } from '@/components/ui';

import { FriendList } from './components/friend-list';
import { FriendRequestDialog } from './components/friend-request-dialog';
import { FriendSearchDialog } from './components/friend-search-dialog';
import * as styles from './styles.css';

export const FriendPage = () => {
  const [value, setValue] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [hasNewRequest, setHasNewRequest] = useState(false);

  const { data } = useFriendsMe();

  const debouncedNickname = useDebounce((value: string) => {
    setNickname(value);
  }, 300);

  useEffect(() => {
    const handleFriendRequest = () => setHasNewRequest(true);

    socketPubSub.subscribe('friend-request', handleFriendRequest);
    return () => {
      socketPubSub.unsubscribe('friend-request', handleFriendRequest);
    };
  }, []);

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>Friend List</h2>

      <div className={styles.friendContainer}>
        <FriendSearchDialog>
          <button className={styles.addFriend} />
        </FriendSearchDialog>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            placeholder="Please enter your friend's nickname."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              debouncedNickname(e.target.value);
            }}
          />
        </div>
      </div>
      <FriendRequestDialog onOpen={() => setHasNewRequest(false)}>
        <button className={hasNewRequest ? styles.alarmRinging : styles.alarm} />
      </FriendRequestDialog>

      <Divider className={styles.separate} />

      <FriendList
        friends={data?.data?.friends.filter((friend) => friend.nickname.startsWith(nickname)) ?? []}
      />
    </Flex>
  );
};
