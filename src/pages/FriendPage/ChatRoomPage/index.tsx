import { useNavigate, useSearchParams } from 'react-router-dom';

import { useFriendsMe } from '@/api';

import { ChatBox } from './components/chat-box';
import { FriendHeader } from './components/chat-friend-header';
import { FriendList } from './components/chat-friend-list';
import * as styles from './styles.css';

export const ChatRoomPage = () => {
  const navigate = useNavigate();
  const { data } = useFriendsMe();
  const friends = data?.data?.friends ?? [];

  const [params] = useSearchParams();
  const friendId = Number(params.get('friendId'));

  const currentFriend = friends.find((f) => f.friendId === friendId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <button className={styles.button} aria-label="채팅 나가기" onClick={() => navigate(-1)} />
        </div>

        <div className={styles.friendListWrapper}>
          {currentFriend && <FriendList friend={currentFriend} />}
        </div>
      </div>

      <div className={styles.chatSection}>
        {currentFriend && <FriendHeader friend={currentFriend} />}
        <ChatBox />
      </div>
    </div>
  );
};
