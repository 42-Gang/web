import type { Match } from '@/api';

import * as styles from './styles.css';
import { TOURNAMENT_ROUNDS, PLAYER_POSITIONS } from '../../constants';
import { PlayerCard } from '../PlayerCard';

type FinalMatchProps = {
  match: Match;
  readyIds: number[];
  semiFinals: [Match, Match];
};

const isPlayerReady = (playerId: string | undefined, readyPlayerIds: number[]): boolean => {
  return !!playerId && readyPlayerIds.includes(parseInt(playerId, 10));
};

export const FinalMatch = ({ match, readyIds, semiFinals }: FinalMatchProps) => {
  const [semiFinal1, semiFinal2] = semiFinals;
  const eliminatedPlayerIds = [semiFinal1, semiFinal2].flatMap((semiFinal) => {
    if (!semiFinal?.player1 || !semiFinal?.player2 || !semiFinal.winnerId) return [];
    return semiFinal.player1.id === semiFinal.winnerId
      ? [semiFinal.player2.id]
      : [semiFinal.player1.id];
  });

  return (
    <div className={styles.matchBoxNoBorder}>
      <PlayerCard
        player={match.player1}
        isWinner={match.player1?.id === match.winnerId}
        isLoser={!!match.player1 && eliminatedPlayerIds.includes(match.player1.id)}
        isReady={isPlayerReady(match.player1?.id, readyIds)}
        showStats
        round={TOURNAMENT_ROUNDS.FINAL}
        side={PLAYER_POSITIONS.LEFT}
      />
      <span className={styles.vs}>vs</span>
      <PlayerCard
        player={match.player2}
        isWinner={match.player2?.id === match.winnerId}
        isLoser={!!match.player2 && eliminatedPlayerIds.includes(match.player2.id)}
        isReady={isPlayerReady(match.player2?.id, readyIds)}
        showStats
        round={TOURNAMENT_ROUNDS.FINAL}
        side={PLAYER_POSITIONS.RIGHT}
      />
    </div>
  );
};
