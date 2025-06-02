import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';
import { ProfileCard } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

type FriendListProps = {
  current?: number;
  friends: Friend[];
};

export const FriendList = ({ current, friends }: FriendListProps) => {
  const { status } = useStatusAtom();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {friends.map((friend) => {
          const friendStatus = status.find((s) => s.friendId === friend.friendId)?.status;

          return (
            <button
              key={friend.friendId}
              className={clsx(styles.item, current === friend.friendId && styles.current)}
              onClick={() =>
                navigate(`${PATH.FRIEND_CHATROOM}?friend=${friend.friendId}`, { replace: true })
              }
            >
              <ProfileCard
                avatarUrl={friend.avatarUrl || '/assets/images/sample-avatar.png'}
                nickname={friend.nickname}
                status={friendStatus}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
