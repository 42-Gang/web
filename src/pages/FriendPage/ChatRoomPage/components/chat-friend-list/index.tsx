import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';
import { ProfileCard } from '@/components/ui';

import * as styles from './styles.css';

type FriendListProps = {
  friends: Friend[];
};

export const FriendList = ({ friends }: FriendListProps) => {
  const { status } = useStatusAtom();

  return (
    <div className={styles.friendList}>
      <ul className={styles.list}>
        <li className={styles.divider} />
        {friends.map((friend) => {
          const friendStatus = status.find((s) => s.friendId === friend.friendId)?.status;

          return (
            <li key={friend.friendId} className={styles.item}>
              <ProfileCard
                avatarUrl={friend.avatarUrl || '/assets/images/sample-avatar.png'}
                nickname={friend.nickname}
                status={friendStatus}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
