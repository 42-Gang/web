import { useState } from 'react';

import * as styles from './styles.css';

type ChatInputProps = {
  onSend: (text: string) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isComposing) return;
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className={styles.chatDivider} />
      <div className={styles.chatInputWrapper}>
        <input
          className={styles.input}
          value={input}
          placeholder="Enter message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button className={styles.sendButton} onClick={handleSend} />
      </div>
    </>
  );
};
