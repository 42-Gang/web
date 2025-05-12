import { useEffect } from 'react';

import { useSocket } from '@/api/socket';
import type { Friend } from '@/api/types';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import { FriendList } from './friend-list';
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

  const friendList: Friend[] = [
    {
      friendId: 1,
      nickname: 'DragonSlayer',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 2,
      nickname: 'PixelQueen',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 3,
      nickname: 'Knightmare',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 4,
      nickname: 'AFKMaster',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 5,
      nickname: 'SilentArrow',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 6,
      nickname: 'CodeWizard',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 7,
      nickname: 'BlazeRunner',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
    {
      friendId: 8,
      nickname: 'Frostbite',
      avatarUrl: '/assets/images/sample-avatar.png',
      status: 'ACCEPTED',
    },
  ];

  // const { data: friends } = useFriendsMe();
  // const friendList = friends?.data?.friends || [];

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.Title}>Friend List</h2>

      <div className={styles.FriendContainer}>
        <button className={styles.addFriend} />
        <div className={styles.inputWrapper}>
          <input className={styles.input} placeholder="Please enter your friend's nickname." />
        </div>
      </div>

      <button className={styles.alarm} />

      <FriendList friends={friendList} />
      {/* {friendList.map((friend) => (
        <div key={friend.friendId}>
          <p style={{ color: 'white' }}>{friend.nickname}</p>
        </div>
      ))} */}
    </Flex>
  );
};
