import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { TournamentRoundType } from '@/api/types';
import { BackButton } from '@/components/ui';

import { roundTwoData } from './__mocks__/round2';
import { roundFourData } from './__mocks__/round4';
import { MatchNode } from './components/MatchNode';
import * as styles from './styles.css';

export const TournamentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const handleReady = () => {
    if (!readyIds.includes(currentUserId)) {
      setReadyIds((prev) => [...prev, currentUserId]);
    }
  };

  return (
    <>
      <BackButton />

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Tournament</h1>
          <h2 className={styles.round}>{round === 'ROUND_2' ? 'Round 2' : 'Round 4'}</h2>
        </header>

        <MatchNode
          match={tournamentData}
          isRoot
          readyIds={readyIds}
          currentUserId={currentUserId}
        />

        <div className={styles.buttonWrapper}>
          <button className={styles.readyButton} onClick={handleReady} aria-label="Ready" />
        </div>
      </div>
    </>
  );
};
