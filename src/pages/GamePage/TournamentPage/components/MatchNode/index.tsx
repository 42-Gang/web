import type { Match, TournamentRoundType, VerticalPosition, HorizontalVariant } from '@/api';

import { MatchLines } from '../MatchLines';
import { PlayerCard } from '../PlayerCard';
import * as styles from './styles.css';
import {
  TOURNAMENT_ROUNDS,
  PLAYER_POSITIONS,
  WINNER_POSITIONS,
  TOURNAMENT_SIZES,
} from '../../constants';

type MatchNodeProps = {
  match: Match;
  isRoot?: boolean;
  side?: HorizontalVariant;
  readyIds?: number[];
  currentUserId?: string;
  showLine?: boolean;
  isTwoPlayer?: boolean;
  tournamentSize?: number;
};

type MatchTreePosition = {
  isUserInLeftSubtree: boolean;
  centerSide: HorizontalVariant;
  shouldRenderLeftLine: boolean;
  shouldRenderRightLine: boolean;
};

const isPlayerReady = (playerId: string | undefined, readyPlayerIds: number[]): boolean => {
  return !!playerId && readyPlayerIds.includes(parseInt(playerId, 10));
};

const isPlayerInMatch = (match: Match | undefined, playerId: string): boolean => {
  if (!match) return false;

  const { player1, player2, children } = match;
  const isInCurrentMatch = player1?.id === playerId || player2?.id === playerId;

  if (isInCurrentMatch) return true;

  if (children?.length === 2) {
    return isPlayerInMatch(children[0], playerId) || isPlayerInMatch(children[1], playerId);
  }

  return false;
};

const isPlayerInLeftSubtree = (match: Match, playerId: string): boolean => {
  const [leftSemiFinal] = match.children ?? [];
  return isPlayerInMatch(leftSemiFinal, playerId);
};

const getCurrentRound = (match: Match, tournamentSize?: number): TournamentRoundType => {
  if (!match.children) {
    return TOURNAMENT_ROUNDS.FINAL;
  }

  if (tournamentSize === TOURNAMENT_SIZES.DUEL) {
    return TOURNAMENT_ROUNDS.FINAL;
  }

  return TOURNAMENT_ROUNDS.SEMI_FINAL;
};

const calculateMatchTreePosition = (
  match: Match,
  isRoot: boolean,
  side: HorizontalVariant | undefined,
  currentUserId: string,
  currentRound: TournamentRoundType,
): MatchTreePosition => {
  const isRound4 = currentRound === TOURNAMENT_ROUNDS.SEMI_FINAL;

  const isUserInLeftSubtree =
    isRound4 && isRoot ? isPlayerInLeftSubtree(match, currentUserId) : true;
  const centerSide: HorizontalVariant = isUserInLeftSubtree
    ? PLAYER_POSITIONS.LEFT
    : PLAYER_POSITIONS.RIGHT;

  const shouldRenderLeftLine =
    (!isRoot && side === PLAYER_POSITIONS.LEFT) ||
    (isRoot && isRound4 && isUserInLeftSubtree && side === PLAYER_POSITIONS.LEFT);

  const shouldRenderRightLine =
    (!isRoot && side === PLAYER_POSITIONS.RIGHT) ||
    (isRoot && isRound4 && !isUserInLeftSubtree && side === PLAYER_POSITIONS.RIGHT);

  return {
    isUserInLeftSubtree,
    centerSide,
    shouldRenderLeftLine,
    shouldRenderRightLine,
  };
};

export const MatchNode = ({
  match,
  isRoot = false,
  side,
  readyIds = [],
  currentUserId = '',
  showLine = true,
  isTwoPlayer = false,
  tournamentSize,
}: MatchNodeProps) => {
  const currentRound = getCurrentRound(match, tournamentSize);

  const isRound4 = currentRound === TOURNAMENT_ROUNDS.SEMI_FINAL;
  const isRound2 = currentRound === TOURNAMENT_ROUNDS.FINAL;
  const hasChildren = !!match.children;

  const [leftSemiFinal, rightSemiFinal] = match.children ?? [];

  const matchTreePosition = calculateMatchTreePosition(
    match,
    isRoot,
    side,
    currentUserId,
    currentRound,
  );

  const shouldRenderSemiFinalDecoration =
    isRoot && isRound4 && leftSemiFinal?.player1 && rightSemiFinal?.player1;
  const shouldRenderFinalMatch = isRoot && isRound2;

  const winnerFromLeft: VerticalPosition =
    match.winnerId === leftSemiFinal?.winnerId ? WINNER_POSITIONS.TOP : WINNER_POSITIONS.BOTTOM;

  if (!hasChildren) {
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
          winner={
            match.winnerId === match.player1?.id ? WINNER_POSITIONS.TOP : WINNER_POSITIONS.BOTTOM
          }
          variant={side ?? PLAYER_POSITIONS.LEFT}
          highlight={isRound2}
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
  }

  return (
    <div className={styles.treeWrapper}>
      <div className={styles.roundWrapper}>
        <div className={styles.branchWrapper}>
          {leftSemiFinal && (
            <MatchNode
              match={leftSemiFinal}
              side={PLAYER_POSITIONS.LEFT}
              readyIds={readyIds}
              currentUserId={currentUserId}
              showLine={isRoot ? matchTreePosition.shouldRenderLeftLine : true}
              tournamentSize={tournamentSize}
            />
          )}
          <div className={styles.centerColumn}>
            {shouldRenderSemiFinalDecoration ? (
              <div className={styles.centerDecoration}>
                <img
                  src="/assets/images/tournament-arrow.png"
                  alt="Arrow Left"
                  className={styles.arrowLeft}
                />
                <img
                  src="/assets/images/tournament-placeholder-ball.png"
                  alt="Mystery Ball"
                  className={styles.questionImage}
                />
                <img
                  src="/assets/images/tournament-arrow.png"
                  alt="Arrow Right"
                  className={styles.arrowRight}
                />
              </div>
            ) : shouldRenderFinalMatch ? (
              (() => {
                const [semiFinal1, semiFinal2] = match.children ?? [];
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
              })()
            ) : (
              (() => {
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
                          isRoot && isRound4
                            ? matchTreePosition.centerSide
                            : (side ?? PLAYER_POSITIONS.LEFT)
                        }
                        highlight={isRound2}
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
                        side={
                          isRoot && isRound4
                            ? matchTreePosition.centerSide
                            : (side ?? PLAYER_POSITIONS.LEFT)
                        }
                      />
                      <span className={styles.vs}>vs</span>
                      <PlayerCard
                        player={match.player2}
                        isWinner={match.player2?.id === match.winnerId}
                        isLoser={isFinalRound && player2Eliminated}
                        isReady={isPlayerReady(match.player2?.id, readyIds)}
                        showStats={showStats}
                        round={currentRound}
                        side={
                          isRoot && isRound4
                            ? matchTreePosition.centerSide
                            : (side ?? PLAYER_POSITIONS.LEFT)
                        }
                      />
                    </div>
                  </>
                );
              })()
            )}
          </div>
          {rightSemiFinal && (
            <MatchNode
              match={rightSemiFinal}
              side={PLAYER_POSITIONS.RIGHT}
              readyIds={readyIds}
              currentUserId={currentUserId}
              showLine={isRoot ? matchTreePosition.shouldRenderRightLine : true}
              tournamentSize={tournamentSize}
            />
          )}
        </div>
      </div>
    </div>
  );
};
