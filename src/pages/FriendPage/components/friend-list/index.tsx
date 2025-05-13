import type { Friend } from '@/api/types';

// import { useFriendsMe } from "@/api";

import { FriendItem } from './friend-item';
import * as styles from './styles.css';
type FriendListProps = {
  friends: Friend[];
};
export const FriendList = ({ friends }: FriendListProps) => {
  // const { data } = useFriendsMe();
  // const friends = data?.data?.friends || [];
  return (
    <div className={styles.friendListWrapper}>
      {friends.map((friend) => (
        <FriendItem key={friend.friendId} friend={friend} />
      ))}
    </div>
  );
};
