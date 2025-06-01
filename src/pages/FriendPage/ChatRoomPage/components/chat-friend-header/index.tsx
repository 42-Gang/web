import { toast } from 'sonner';

import { useBlockFriend } from '@/api/mutations/useBlockFriend';
import { useUnblockFriend } from '@/api/mutations/useUnblockFriend';
import { Friend } from '@/api/types';

import * as styles from './styles.css';

type FriendHeaderProps = {
  friend: Friend;
};

export const FriendHeader = ({ friend }: FriendHeaderProps) => {
  const { mutate: blockFriend } = useBlockFriend();
  const { mutate: unblockFriend } = useUnblockFriend();

  const isBlocked = friend.status === 'BLOCKED';

  const handleToggleBlock = () => {
    const payload = { friendId: friend.friendId };

    if (isBlocked) {
      unblockFriend(payload, {
        onSuccess: (response) => {
          toast.success(response.message);
        },
        onError: () => {
          toast.error('차단 해제에 실패했습니다.');
        },
      });
    } else {
      blockFriend(payload, {
        onSuccess: (response) => {
          toast.success(response.message);
        },
        onError: () => {
          toast.error('차단에 실패했습니다.');
        },
      });
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <img
          className={styles.avatar}
          src={friend.avatarUrl || '/assets/images/sample-avatar.png'}
          alt="friend avatar"
        />
        <span className={styles.nickname}>{friend.nickname}</span>
      </div>

      <button className={styles.blockToggle} data-selected={isBlocked} onClick={handleToggleBlock}>
        <span>{isBlocked ? 'UNBLOCK' : 'BLOCK'}</span>
      </button>
    </div>
  );
};
