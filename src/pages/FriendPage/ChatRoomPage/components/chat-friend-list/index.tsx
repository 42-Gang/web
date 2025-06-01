import { clsx } from 'clsx';

import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';
import { ProfileCard } from '@/components/ui';

import * as styles from './styles.css';

type FriendListProps = {
  current?: number;
  friends: Friend[];
};

export const FriendList = ({ current, friends }: FriendListProps) => {
  const { status } = useStatusAtom();

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {friends.map((friend) => {
          const friendStatus = status.find((s) => s.friendId === friend.friendId)?.status;

          return (
            <li
              key={friend.friendId}
              className={clsx(styles.item, current === friend.friendId && styles.current)}
            >
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
