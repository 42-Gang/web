import type { Match, TournamentRoundType, VerticalPosition, HorizontalVariant } from '@/api';

import { FinalMatch } from './FinalMatch';
import { IntermediateMatch } from './IntermediateMatch';
import { LeafMatch } from './LeafMatch';
import { SemiFinalDecoration } from './SemiFinalDecoration';
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
    return (
      <LeafMatch
        match={match}
        readyIds={readyIds}
        currentRound={currentRound}
        side={side}
        isTwoPlayer={isTwoPlayer}
      />
    );
  }

  const renderCenterContent = () => {
    if (shouldRenderSemiFinalDecoration) {
      return <SemiFinalDecoration />;
    }

    if (shouldRenderFinalMatch && match.children) {
      return <FinalMatch match={match} readyIds={readyIds} semiFinals={match.children} />;
    }

    return (
      <IntermediateMatch
        match={match}
        readyIds={readyIds}
        currentRound={currentRound}
        side={side}
        isRoot={isRoot}
        isRound4={isRound4}
        winnerFromLeft={winnerFromLeft}
        matchTreePosition={matchTreePosition}
        showLine={showLine}
      />
    );
  };

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
          <div className={styles.centerColumn}>{renderCenterContent()}</div>
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
