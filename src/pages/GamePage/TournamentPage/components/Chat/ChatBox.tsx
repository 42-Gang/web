import * as styles from './styles.css';

type ChatBoxProps = {
  messages: string[];
};

export const ChatBox = ({ messages }: ChatBoxProps) => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatHeader}>Chat</div>
      <div className={styles.chatDivider} />
      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    </div>
  );
};
