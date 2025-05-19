import { Separated } from 'react-simplikit';

import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';
import { Divider, ProfileCard } from '@/components/ui';

import * as styles from './styles.css';

type FriendListProps = {
  friends: Friend[];
};

export const FriendList = ({ friends }: FriendListProps) => {
  const { status } = useStatusAtom();

  return (
    <Separated by={<Divider />}>
      {friends.map((friend) => (
        <div key={friend.friendId} className={styles.item}>
          <ProfileCard
            nickname={friend.nickname}
            avatarUrl={friend.avatarUrl}
            status={status.find((s) => s.friendId === friend.friendId)?.status}
          />

          <button>
            <img src="/assets/images/message.svg" alt="Message Icon" />
          </button>
        </div>
      ))}
    </Separated>
  );
};
