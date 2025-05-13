import { useNavigate } from 'react-router-dom';

import { ChatBox } from './components/chat-box';
import { FriendHeader } from './components/friend-header';
// import { FriendList } from './components/friend-list';
import * as styles from './FriendChatRoomPage.styles.css';

export const FriendChatRoomPage = () => {
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
            aria-label="친구 DM 나가기"
            onClick={() => navigate('/friend')}
          />
        </div>
        <div className={styles.friendListWrapper}>{/* <FriendList /> */}</div>
      </div>
    </div>
  );
};
