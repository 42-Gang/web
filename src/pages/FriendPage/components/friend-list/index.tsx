import type { Friend } from '@/api/types';

import * as styles from './styles.css';
import { FriendItem } from '../friend-list/friend-item';

type FriendListProps = {
  friends: Friend[];
};

export const FriendList = ({ friends }: FriendListProps) => {
  return (
    <div className={styles.friendListWrapper}>
      {friends.map((friend) => (
        <FriendItem key={friend.friendId} friend={friend} />
      ))}
    </div>
  );
};
