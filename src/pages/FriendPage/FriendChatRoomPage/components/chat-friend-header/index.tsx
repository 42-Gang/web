import { useState } from 'react';

import * as styles from './styles.css';

export const FriendHeader = ({
  profileUrl = '/assets/images/sample-avatar.png',
  nickname = 'PING',
}: {
  profileUrl?: string;
  nickname?: string;
}) => {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleToggleBlock = () => {
    setIsBlocked((prev) => !prev);
    // TODO: 실제 block/unblock API 요청
  };

  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <img src={profileUrl} alt="profile" className={styles.avatar} />
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <button className={styles.blockButton} onClick={handleToggleBlock}>
        {isBlocked ? 'UNBLOCK' : 'BLOCK'}
      </button>
    </div>
  );
};
