import { useSearchParams } from 'react-router-dom';

import { useFriendsMe } from '@/api';
import { BackButton } from '@/components/ui';
import { PATH } from '@/constants';

import { ChatBox } from './components/chat-box';
import { FriendHeader } from './components/chat-friend-header';
import { FriendList } from './components/chat-friend-list';
import * as styles from './styles.css';

export const ChatRoomPage = () => {
  const { data, isLoading } = useFriendsMe();
  const friends = data?.data?.friends ?? [];

  const [params] = useSearchParams();
  const friendId = Number(params.get('friend'));

  const current = friends.find((f) => f.friendId === friendId);

  if (isLoading) {
    return <div className={styles.chat}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <BackButton href={PATH.FRIEND} />
        <FriendList friends={friends} />
      </div>

      <div className={styles.chat}>
        {current && <FriendHeader friend={current} />}
        <ChatBox />
      </div>
    </div>
  );
};
