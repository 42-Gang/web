import type { Match, TournamentRoundType, HorizontalVariant } from '@/api';

import { TOURNAMENT_ROUNDS, PLAYER_POSITIONS } from '../../constants';
import { MatchLines } from '../MatchLines';
import { PlayerCard } from '../PlayerCard';
import * as styles from './styles.css';

type LeafMatchProps = {
  match: Match;
  readyIds: number[];
  currentRound: TournamentRoundType;
  side?: HorizontalVariant;
  isTwoPlayer: boolean;
};

const isPlayerReady = (playerId: string | undefined, readyPlayerIds: number[]): boolean => {
  return !!playerId && readyPlayerIds.includes(parseInt(playerId, 10));
};

export const LeafMatch = ({ match, readyIds, currentRound, side, isTwoPlayer }: LeafMatchProps) => {
  const isFinalRoundLeaf = currentRound === TOURNAMENT_ROUNDS.FINAL;
  const showStats = currentRound === TOURNAMENT_ROUNDS.SEMI_FINAL;
  const player1Eliminated = isFinalRoundLeaf && match.player1?.id !== match.winnerId;
  const player2Eliminated = isFinalRoundLeaf && match.player2?.id !== match.winnerId;

  return (
    <div className={isTwoPlayer ? styles.leafWrapperHorizontal : styles.leafWrapper}>
      <PlayerCard
        player={match.player1}
        isWinner={match.player1?.id === match.winnerId}
        isLoser={player1Eliminated}
        isReady={isPlayerReady(match.player1?.id, readyIds)}
        showStats={showStats}
        round={currentRound}
        side={side}
      />
      <MatchLines
        winner={match.winnerId === match.player1?.id ? 'top' : 'bottom'}
        variant={side ?? PLAYER_POSITIONS.LEFT}
        highlight={currentRound === TOURNAMENT_ROUNDS.FINAL}
        round={currentRound}
        isTwoPlayer={isTwoPlayer}
      />
      <PlayerCard
        player={match.player2}
        isWinner={match.player2?.id === match.winnerId}
        isLoser={player2Eliminated}
        isReady={isPlayerReady(match.player2?.id, readyIds)}
        showStats={showStats}
        round={currentRound}
        side={side}
      />
    </div>
  );
};
