import { useState } from 'react';

import { useUsersMe } from '@/api/queries/useUsersMe.ts';
import type { ChatMessage } from '@/api/types/chat.ts';

import * as styles from './styles.css.ts';

type ChatInputProps = {
  onSend: (message: ChatMessage) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const { data: me } = useUsersMe();
  const user = me?.data;

  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  // TODO: 현재는 로컬 메시지 구분용으로 Date.now()를 사용
  // 추후 웹소켓 연동 시 서버에서 고유 ID를 받아와야 함
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !user) return;

    onSend({
      id: Date.now(),
      nickname: user.nickname,
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
    <>
      <div className={styles.chatDivider} />
      <div className={styles.chatInputWrapper}>
        <input
          className={styles.input}
          value={input}
          placeholder={user ? '메시지를 입력하세요' : '유저 정보를 불러오는 중입니다...'}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          disabled={!user}
        />
        <button className={styles.sendButton} onClick={handleSend} disabled={!user} />
      </div>
    </>
  );
};
