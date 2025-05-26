import { useState } from 'react';

import { useUsersMe } from '@/api/queries/useUsersMe';
import type { ChatMessage } from '@/api/types/chat';

import * as styles from './styles.css';

type ChatInputProps = {
  onSend: (message: ChatMessage) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const { data: me } = useUsersMe();
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !me?.data) return;

    onSend({
      id: Date.now(),
      nickname: me.data.nickname,
      time: new Date().toISOString(),
      message: trimmed,
    });

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <div className={styles.chatDivider} />
      <div className={styles.chatInputWrapper}>
        <input
          className={styles.input}
          value={input}
          placeholder="메시지를 입력하세요"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button className={styles.sendButton} onClick={handleSend} />
      </div>
    </div>
  );
};
