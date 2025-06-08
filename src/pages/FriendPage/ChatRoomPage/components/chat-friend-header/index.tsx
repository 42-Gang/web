import { toast } from 'sonner';

import { useBlockFriend, useUnblockFriend, useFriendsMe, type Friend } from '@/api';

import * as styles from './styles.css';

type FriendHeaderProps = {
  current: number;
};

export const FriendHeader = ({ current }: FriendHeaderProps) => {
  const { data } = useFriendsMe();
  const friends: Friend[] = data?.data?.friends ?? [];

  const friend = friends.find((f) => f.friendId === current);

  const { mutate: blockFriend } = useBlockFriend();
  const { mutate: unblockFriend } = useUnblockFriend();

  if (!friend) {
    return <div className={styles.header}>친구 정보를 찾을 수 없습니다.</div>;
  }

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
