import { useNavigate } from 'react-router-dom';

import { ChatBox } from './components/chat-box';
import { FriendHeader } from './components/chat-friend-header';
import { FriendList } from './components/chat-friend-list';
import * as styles from './styles.css';

export const ChatRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatSection}>
        <FriendHeader />
        <ChatBox />
      </div>

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <button
            className={styles.exitButton}
            aria-label="채팅 나가기"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className={styles.friendListWrapper}>
          <FriendList />
        </div>
      </div>
    </div>
  );
};
