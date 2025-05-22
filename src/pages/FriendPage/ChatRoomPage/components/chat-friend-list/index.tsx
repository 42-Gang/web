import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';
import { ProfileCard } from '@/components/ui';

import * as styles from './styles.css';

type FriendListProps = {
  friend: Friend; // ✅ friends → friend (단일)
};

export const FriendList = ({ friend }: FriendListProps) => {
  const { status } = useStatusAtom();

  const friendStatus = status.find((s) => s.friendId === friend.friendId)?.status;

  return (
    <div className={styles.friendList}>
      <ul className={styles.list}>
        <li className={styles.divider} />
        <li className={styles.item}>
          <ProfileCard
            avatarUrl={friend.avatarUrl || '/assets/images/sample-avatar.png'}
            nickname={friend.nickname}
            status={friendStatus}
          />
        </li>
      </ul>
    </div>
  );
};
