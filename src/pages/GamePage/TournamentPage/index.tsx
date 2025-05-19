import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Match } from '@/api/types/game';

import { ChatBox } from './components/Chat/ChatBox';
import { ChatInput } from './components/Chat/ChatInput';
import { MatchNode } from './components/MatchNode';
import * as styles from './styles.css';


const tournamentData = {
  id: 'final',
  winnerId: 'pong',
  player1: {
    id: 'pong',
    name: 'PONG',
    avatarUrl: '/assets/images/sample-avatar.png',
    win: 10,
    lose: 3,
    tournament: 1,
  },
  player2: {
    id: 'ding',
    name: 'Ding',
    avatarUrl: '/assets/images/sample-avatar.png',
    win: 7,
    lose: 5,
    tournament: 2,
  },
  children: [
    {
      id: 'semi1',
      winnerId: 'pong',
      player1: {
        id: 'pong',
        name: 'PONG',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 10,
        lose: 3,
        tournament: 1,
      },
      player2: {
        id: 'ping',
        name: 'PING',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 5,
        lose: 5,
        tournament: 0,
      },
    },
    {
      id: 'semi2',
      winnerId: 'ding',
      player1: {
        id: 'ding',
        name: 'Ding',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 7,
        lose: 5,
        tournament: 2,
      },
      player2: {
        id: 'dong',
        name: 'Dong',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 4,
        lose: 6,
        tournament: 0,
      },
    },
  ] as [Match, Match],
};

export const TournamentPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<string[]>([]);
  const [readyIds, setReadyIds] = useState<string[]>([]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, text]);
  };

  const handleReady = () => {
    const myId = 'pong'; // TODO: 실제 사용자 ID로 바꿔야 함
    setReadyIds((prev) => (prev.includes(myId) ? prev : [...prev, myId]));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack} aria-label="Go back" />
      <div className={styles.bracketSection}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Tournament</h1>
          <h2 className={styles.round}>Round 2</h2>
        </div>
        <MatchNode match={tournamentData} isRoot readyIds={readyIds} />
        <div className={styles.readyButtonWrapper}>
          <button className={styles.readyButton} onClick={handleReady} aria-label="Mark as ready" />
        </div>
      </div>
      <div className={styles.chatSection}>
        <ChatBox messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};
