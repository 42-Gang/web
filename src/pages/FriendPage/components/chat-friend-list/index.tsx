import type { Friend } from '@/api/types';

// import { useFriendsMe } from "@/api";
import * as styles from './styles.css';
import { FriendItem } from '../friend-list/friend-item';

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
