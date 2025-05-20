import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';

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
              <img
                src={friend.avatarUrl || '/assets/images/sample-avatar.png'}
                className={styles.avatar}
                alt={`${friend.nickname}의 아바타`}
              />
              <span>{friend.nickname}</span>

              {friendStatus && (
                <span className={styles.status}>
                  <span className={styles.statusIcon({ status: friendStatus })} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
