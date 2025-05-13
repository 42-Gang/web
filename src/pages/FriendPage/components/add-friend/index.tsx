import { useState } from 'react';

import { Flex } from '@/components/system';

import * as styles from './styles.css.ts';

type User = {
  id: number;
  nickname: string;
  avatarUrl: string;
};

const mockUsers: User[] = [
  { id: 1, nickname: 'Woongbi', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 2, nickname: 'WOfagonSlayer', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 3, nickname: 'PixelQueen', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 4, nickname: 'Knightmare', avatarUrl: '/assets/images/sample-avatar.png' },
];

export const AddFriend = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter((user) => {
    return user.nickname.toLowerCase().startsWith(searchTerm.toLowerCase());
  });

  return (
    <Flex direction="column" alignItems="center">
      <h2 className={styles.title}>Add friend</h2>
      <input
        className={styles.input}
        placeholder="Please enter nickname."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.userList}>
        {filteredUsers.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <img src={user.avatarUrl} alt={user.avatarUrl} className={styles.avatar} />
                <span className={styles.nickname}>{user.nickname}</span>
              </Flex>
              <button className={styles.friendRequest} aria-label="Send friend request" />
            </Flex>
          </div>
        ))}
      </div>
    </Flex>
  );
};
