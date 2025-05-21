import { useSearchParams } from 'react-router-dom';

import type {
  Match,
  TournamentRoundType,
  VerticalPosition,
  HorizontalVariant,
} from '@/api/types/game';

import { MatchLines } from '../MatchLines';
import { PlayerCard } from '../PlayerCard';
import * as styles from './styles.css';


type MatchNodeProps = {
  match: Match;
  isRoot?: boolean;
  side?: HorizontalVariant;
  readyIds?: string[];
  currentUserId?: string;
  showLine?: boolean;
};

const isReady = (id: string | undefined, readyIds: string[]) => !!id && readyIds.includes(id);

const includesUser = (match: Match | undefined, userId: string): boolean => {
  if (!match) return false;
  const { player1, player2, children } = match;

  return (
    player1?.id === userId ||
    player2?.id === userId ||
    (children?.length === 2 &&
      (includesUser(children[0], userId) || includesUser(children[1], userId)))
  );
};

const isUserInLeftSubtree = (match: Match, userId: string): boolean => {
  const [semi1] = match.children ?? [];
  return includesUser(semi1, userId);
};

const renderRound2RootMatch = (match: Match, readyIds: string[]) => (
  <div className={styles.matchBoxNoBorder}>
    <PlayerCard
      player={match.player1}
      isWinner={match.player1?.id === match.winnerId}
      isLarge
      isReady={isReady(match.player1?.id, readyIds)}
    />
    <span className={styles.vs}>vs</span>
    <PlayerCard
      player={match.player2}
      isWinner={match.player2?.id === match.winnerId}
      isLarge
      isReady={isReady(match.player2?.id, readyIds)}
    />
  </div>
);

const renderRound4SemiMatch = () => (
  <div className={styles.centerDecoration}>
    <img src="/assets/images/tournament-arrow.png" alt="Arrow Left" className={styles.arrowLeft} />
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
);

const renderNonRootMatch = (
  match: Match,
  winnerFromTop: VerticalPosition,
  side: HorizontalVariant = 'left',
  showLine = true,
  highlight = true,
  shouldRenderLine = true,
  readyIds: string[] = [],
) => (
  <>
    {showLine && (
      <MatchLines
        winner={winnerFromTop}
        variant={side}
        highlight={highlight}
        shouldRender={shouldRenderLine}
      />
    )}
    <div className={styles.matchBox}>
      <PlayerCard
        player={match.player1}
        isWinner={match.player1?.id === match.winnerId}
        isReady={isReady(match.player1?.id, readyIds)}
      />
      <span className={styles.vs}>vs</span>
      <PlayerCard
        player={match.player2}
        isWinner={match.player2?.id === match.winnerId}
        isReady={isReady(match.player2?.id, readyIds)}
      />
    </div>
  </>
);

export const MatchNode = ({
  match,
  isRoot = false,
  side,
  readyIds = [],
  currentUserId = '',
  showLine = true,
}: MatchNodeProps) => {
  const [searchParams] = useSearchParams();
  const roundParam = searchParams.get('round');
  const round = (roundParam?.toUpperCase() as TournamentRoundType) ?? 'ROUND_4';

  const isRound4 = round === 'ROUND_4';
  const isRound2 = round === 'ROUND_2';
  const hasChildren = !!match.children;

  const [left, right] = match.children ?? [];
  const userIsOnLeft = isRound4 && isRoot ? isUserInLeftSubtree(match, currentUserId) : true;

  const shouldRenderRound4Semi = isRoot && isRound4 && left?.player1 && right?.player1;

  const shouldRenderRound2Root = isRoot && isRound2;

  const winnerFromLeft: VerticalPosition = match.winnerId === left?.winnerId ? 'top' : 'bottom';
  const centerSide: HorizontalVariant = userIsOnLeft ? 'left' : 'right';

  const shouldRenderLeftLine =
    (!isRoot && side === 'left') || (isRoot && isRound4 && userIsOnLeft && side === 'left');

  const shouldRenderRightLine =
    (!isRoot && side === 'right') || (isRoot && isRound4 && !userIsOnLeft && side === 'right');

  if (!hasChildren) {
    return (
      <div className={styles.leafWrapper}>
        <PlayerCard
          player={match.player1}
          isWinner={match.player1?.id === match.winnerId}
          isBottomPosition={false}
          isReady={isReady(match.player1?.id, readyIds)}
        />
        <MatchLines
          winner={match.winnerId === match.player1?.id ? 'top' : 'bottom'}
          variant={side ?? 'left'}
          highlight={isRound2}
          round={isRound2 ? 'ROUND_2' : 'ROUND_4'}
        />
        <PlayerCard
          player={match.player2}
          isWinner={match.player2?.id === match.winnerId}
          isBottomPosition={true}
          isReady={isReady(match.player2?.id, readyIds)}
        />
      </div>
    );
  }

  return (
    <div className={styles.treeWrapper}>
      <div className={styles.roundWrapper}>
        <div className={styles.branchWrapper}>
          {left && (
            <MatchNode
              match={left}
              side="left"
              readyIds={readyIds}
              currentUserId={currentUserId}
              showLine={isRoot ? shouldRenderLeftLine : true}
            />
          )}

          <div className={styles.centerColumn}>
            {shouldRenderRound4Semi
              ? renderRound4SemiMatch()
              : shouldRenderRound2Root
                ? renderRound2RootMatch(match, readyIds)
                : renderNonRootMatch(
                    match,
                    winnerFromLeft,
                    isRoot && isRound4 ? centerSide : side,
                    isRoot && isRound4 ? false : showLine,
                    isRound2,
                    isRoot && isRound4
                      ? centerSide === 'left'
                        ? shouldRenderLeftLine
                        : shouldRenderRightLine
                      : true,
                    readyIds,
                  )}
          </div>

          {right && (
            <MatchNode
              match={right}
              side="right"
              readyIds={readyIds}
              currentUserId={currentUserId}
              showLine={isRoot ? shouldRenderRightLine : true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
