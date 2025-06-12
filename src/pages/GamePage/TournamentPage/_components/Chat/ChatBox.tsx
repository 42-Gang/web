import type { ChatMessage } from '@/api/types/chat.ts';

import * as styles from './styles.css.ts';

type ChatBoxProps = {
  messages: ChatMessage[];
};

export const ChatBox = ({ messages }: ChatBoxProps) => {
  const hasMessages = messages.length > 0;

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatHeader}>Chat</div>
      <div className={styles.chatDivider} />
      <div className={styles.chatBox}>
        {hasMessages ? (
          messages.map((msg) => (
            <div key={msg.id} className={styles.chatMessage}>
              <strong className={styles.chatNickname}>{msg.nickname}</strong>: {msg.message}
            </div>
          ))
        ) : (
          <div className={styles.chatEmptyWrapper}>
            <img
              src="/assets/images/tournament-pingpong.png"
              alt="pingpong idle"
              className={styles.chatEmptyImage}
            />
            <div className={styles.chatEmptyShadow} />
            <div className={styles.chatEmpty}>아직 채팅이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
};
