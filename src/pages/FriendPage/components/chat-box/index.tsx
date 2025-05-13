import { useState } from 'react';

import * as styles from './styles.css';

export const ChatBox = () => {
  const [messages, setMessages] = useState<string[]>(['PING: hello!', 'ME: hi']);
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, `ME: ${inputValue.trim()}`]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.messages}>
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
          type="text"
          className={styles.input}
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button className={styles.sendButton} onClick={handleSend} />
      </div>
    </div>
  );
};
