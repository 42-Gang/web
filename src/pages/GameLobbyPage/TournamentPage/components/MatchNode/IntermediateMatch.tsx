import type { Match, TournamentRoundType, HorizontalVariant, VerticalPosition } from '@/api';

import { TOURNAMENT_ROUNDS, PLAYER_POSITIONS } from '../../constants';
import { MatchLines } from '../MatchLines';
import { PlayerCard } from '../PlayerCard';
import * as styles from './styles.css';

type IntermediateMatchProps = {
  match: Match;
  readyIds: number[];
  currentRound: TournamentRoundType;
  side?: HorizontalVariant;
  isRoot: boolean;
  isRound4: boolean;
  winnerFromLeft: VerticalPosition;
  matchTreePosition: {
    centerSide: HorizontalVariant;
    shouldRenderLeftLine: boolean;
    shouldRenderRightLine: boolean;
  };
  showLine: boolean;
};

const isPlayerReady = (playerId: string | undefined, readyPlayerIds: number[]): boolean => {
  return !!playerId && readyPlayerIds.includes(parseInt(playerId, 10));
};

export const IntermediateMatch = ({
  match,
  readyIds,
  currentRound,
  side,
  isRoot,
  isRound4,
  winnerFromLeft,
  matchTreePosition,
  showLine,
}: IntermediateMatchProps) => {
  const isFinalRound = currentRound === TOURNAMENT_ROUNDS.FINAL;
  const showStats = currentRound === TOURNAMENT_ROUNDS.SEMI_FINAL;
  const player1Eliminated = match.player1?.id !== match.winnerId;
  const player2Eliminated = match.player2?.id !== match.winnerId;

  return (
    <>
      {showLine && (
        <MatchLines
          winner={winnerFromLeft}
          variant={
            isRoot && isRound4 ? matchTreePosition.centerSide : (side ?? PLAYER_POSITIONS.LEFT)
          }
          highlight={currentRound === TOURNAMENT_ROUNDS.FINAL}
          shouldRender={
            isRoot && isRound4
              ? matchTreePosition.centerSide === PLAYER_POSITIONS.LEFT
                ? matchTreePosition.shouldRenderLeftLine
                : matchTreePosition.shouldRenderRightLine
              : true
          }
          round={currentRound}
        />
      )}
      <div className={styles.matchBox}>
        <PlayerCard
          player={match.player1}
          isWinner={match.player1?.id === match.winnerId}
          isLoser={isFinalRound && player1Eliminated}
          isReady={isPlayerReady(match.player1?.id, readyIds)}
          showStats={showStats}
          round={currentRound}
          side={isRoot && isRound4 ? matchTreePosition.centerSide : (side ?? PLAYER_POSITIONS.LEFT)}
        />
        <span className={styles.vs}>vs</span>
        <PlayerCard
          player={match.player2}
          isWinner={match.player2?.id === match.winnerId}
          isLoser={isFinalRound && player2Eliminated}
          isReady={isPlayerReady(match.player2?.id, readyIds)}
          showStats={showStats}
          round={currentRound}
          side={isRoot && isRound4 ? matchTreePosition.centerSide : (side ?? PLAYER_POSITIONS.LEFT)}
        />
      </div>
    </>
  );
};
