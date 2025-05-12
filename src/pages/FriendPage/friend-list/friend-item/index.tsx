import type { Friend } from '@/api/types';
import { UserStatus } from '@/components/ui/user-status';

import * as styles from './styles.css';

type friendItemProps = {
  friend: Friend;
};

export const FriendItem = ({ friend }: friendItemProps) => {
  return (
    <div className={styles.friendItem}>
      <img src={friend.avatarUrl} alt="avatar" className={styles.avatar} />
      <div className={styles.userWrapper}>
        <span className={styles.nickname}>{friend.nickname}</span>
        <UserStatus status="OFFLINE" />
      </div>
      <button className={styles.messageIcon} aria-label="message" />
    </div>
  );
};
