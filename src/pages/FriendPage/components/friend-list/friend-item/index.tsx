// import { useNavigate } from 'react-router-dom';

import type { Friend } from '@/api/types';
import { UserStatus } from '@/components/ui/user-status';
// import { PATH } from '@/constants';

import * as styles from './styles.css';

type friendItemProps = {
  friend: Friend;
};

export const FriendItem = ({ friend }: friendItemProps) => {
  // const navigate = useNavigate();

  // const handleMessageClick = () => {
  //   navigate(`${PATH.FRIEND_CHATROOM}/${friend.friendId}`);
  // }; // 이후 Chatting 페이지와 연결 작업 예정

  return (
    <div className={styles.friendItem}>
      <img src={friend.avatarUrl} alt="avatar" className={styles.avatar} />

      <div className={styles.nicknameContainer}>
        <span className={styles.nickname}>{friend.nickname}</span>
        <UserStatus status="OFFLINE" />
      </div>

      <button className={styles.messageIcon} aria-label="message" />
    </div>
  );
};
