import { useState } from 'react';

import * as styles from './styles.css';

export const ChatBox = () => {
  const [messages, setMessages] = useState<string[]>(['PING: hello!', 'ME: hi']);
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, `ME: ${message.trim()}`]);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.messageList}>
        {messages.map((msg, idx) => {
          const isMyMessage = msg.startsWith('ME:');
          return (
            <div key={idx} className={isMyMessage ? styles.myMessage : styles.otherMessage}>
              {msg}
            </div>
          );
        })}
      </div>

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button className={styles.sendButton} onClick={handleSend} />
      </div>
    </div>
  );
};
