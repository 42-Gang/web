import { useNavigate } from 'react-router-dom';

import { ChatBox } from '../chat-box';
import { FriendHeader } from '../friend-header';
import { FriendList } from '../friend-list';
import * as styles from './styles.css';

export const FriendChatRoom = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/Friend');
  };

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
            aria-label="Friend-DM Page Exit"
            onClick={handleExit}
          />
        </div>
        <div className={styles.friendListWrapper}>
          <FriendList />
        </div>
      </div>
    </div>
  );
};
