import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { ChatMessage, TournamentRoundType } from '@/api/types';
import { BackButton } from '@/components/ui';

import { roundTwoData } from './__mocks__/round2';
import { roundFourData } from './__mocks__/round4';
import { ChatBox, ChatInput } from './_components/Chat';
import { MatchNode } from './_components/MatchNode';
import * as styles from './styles.css.ts';

export const TournamentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [readyIds, setReadyIds] = useState<string[]>([]);

  const currentUserId = 'pong'; // TODO: 실제 사용자 연동 (테스트용 임시 유저)

  const rawRound = searchParams.get('round');

  const isValidRound = (round: string | null): round is TournamentRoundType =>
    round === 'ROUND_2' || round === 'ROUND_4';

  const fallback = useMemo(() => {
    if (isValidRound(rawRound)) return rawRound;
    const stored = sessionStorage.getItem('lastValidRound');
    return isValidRound(stored) ? stored : 'ROUND_4';
  }, [rawRound]);

  useEffect(() => {
    if (isValidRound(rawRound)) {
      sessionStorage.setItem('lastValidRound', rawRound);
    }
  }, [rawRound]);

  useEffect(() => {
    if (rawRound && !isValidRound(rawRound)) {
      navigate(`/game/tournament?round=${fallback}`, { replace: true });
    }
  }, [rawRound, navigate, fallback]);

  const round: TournamentRoundType = isValidRound(rawRound) ? rawRound : fallback;

  const tournamentData = round === 'ROUND_2' ? roundTwoData : roundFourData;

  const handleSend = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleReady = () => {
    if (!readyIds.includes(currentUserId)) {
      setReadyIds((prev) => [...prev, currentUserId]);
    }
  };

  const renderDevToggleButtons = () => (
    <div style={{ position: 'absolute', top: 4, right: 10 }}>
      <button
        style={{ padding: '4px 8px', fontSize: '13px' }}
        onClick={() => navigate('/game/tournament?round=ROUND_2')}
      >
        Round 2 보기
      </button>
      <button
        style={{ padding: '4px 8px', fontSize: '13px' }}
        onClick={() => navigate('/game/tournament?round=ROUND_4')}
      >
        Round 4 보기
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      {import.meta.env.MODE === 'development' && renderDevToggleButtons()}

      <BackButton />

      <div className={styles.bracketSection}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Tournament</h1>
          <h2 className={styles.round}>{round === 'ROUND_2' ? 'Round 2' : 'Round 4'}</h2>
        </div>

        <MatchNode
          match={tournamentData}
          isRoot
          readyIds={readyIds}
          currentUserId={currentUserId}
        />

        <div className={styles.readyButtonWrapper}>
          <button className={styles.readyButton} onClick={handleReady} aria-label="Ready" />
        </div>
      </div>

      <div className={styles.chatSection}>
        <ChatBox messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};
