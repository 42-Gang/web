import { useSearchParams } from 'react-router-dom';

import { useFriendsMe } from '@/api';
import { BackButton } from '@/components/ui';
import { PATH } from '@/constants';

import { ChatBox } from './components/chat-box';
import { FriendHeader } from './components/chat-friend-header';
import { FriendList } from './components/chat-friend-list';
import * as styles from './styles.css';

export const ChatRoomPage = () => {
  const { data } = useFriendsMe();
  const friends = data?.data?.friends ?? [];

  const [params] = useSearchParams();
  const friendId = Number(params.get('friendId'));

  const currentFriend = friends.find((f) => f.friendId === friendId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <BackButton href={PATH.FRIEND} />

        <div className={styles.friendListWrapper}>
          {currentFriend && <FriendList friends={friends} />}
        </div>
      </div>

      <div className={styles.chatSection}>
        {currentFriend && <FriendHeader friend={currentFriend} />}
        <ChatBox />
      </div>
    </div>
  );
};
