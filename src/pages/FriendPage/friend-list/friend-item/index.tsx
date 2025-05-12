import type { Friend } from '@/api/types';

import * as styles from './styles.css';

type friendItemProps = {
  friend: Friend;
};

export const FriendItem = ({ friend }: friendItemProps) => {
  return (
    <div className={styles.friendItem}>
      <img src={friend.avatarUrl} alt="avatar" className={styles.avatar} />
      <div className={styles.nickname}>{friend.nickname}</div>
      <button className={styles.messageIcon} aria-label="message" />
    </div>
  );
};
