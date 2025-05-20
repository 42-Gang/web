import { useState } from 'react';

import { Friend } from '@/api/types';

import * as styles from './styles.css';

type FriendHeaderProps = {
  friend: Friend;
};

export const FriendHeader = ({ friend }: FriendHeaderProps) => {
  const [isBlocked, setIsBlocked] = useState(friend.status === 'BLOCKED');

  const handleToggleBlock = () => {
    setIsBlocked((prev) => !prev);
  };

  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <img
          src={friend.avatarUrl || '/assets/images/sample-avatar.png'}
          alt="friend avatar"
          className={styles.avatar}
        />
        <span className={styles.nickname}>{friend.nickname}</span>
      </div>
      <button className={styles.blockButton} data-selected={isBlocked} onClick={handleToggleBlock}>
        <span className={styles.buttonText}>{isBlocked ? 'UNBLOCK' : 'BLOCK'}</span>
      </button>
    </div>
  );
};
