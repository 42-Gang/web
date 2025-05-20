import { useNavigate } from 'react-router-dom';
import { Separated } from 'react-simplikit';

import { useUsersMe } from '@/api';
import { Friend } from '@/api/types';
import { useStatusAtom } from '@/atoms/useStatusAtom';
import { Divider, ProfileCard } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

type FriendListProps = {
  friends: Friend[];
};

export const FriendList = ({ friends }: FriendListProps) => {
  const { status } = useStatusAtom();
  const navigate = useNavigate();
  const { data: me } = useUsersMe();

  const handleClickMessage = async (friendId: number) => {
    const userId = me?.data?.id;

    if (!userId) return;

    navigate(`${PATH.FRIEND_CHATROOM}?userId=${userId}&friendId=${friendId}`);
  };

  return (
    <Separated by={<Divider />}>
      {friends.map((friend) => (
        <div key={friend.friendId} className={styles.item}>
          <ProfileCard
            nickname={friend.nickname}
            avatarUrl={friend.avatarUrl}
            status={status.find((s) => s.friendId === friend.friendId)?.status}
          />

          <button onClick={() => handleClickMessage(friend.friendId)}>
            <img src="/assets/images/message.svg" alt="Message Icon" />
          </button>
        </div>
      ))}
    </Separated>
  );
};
