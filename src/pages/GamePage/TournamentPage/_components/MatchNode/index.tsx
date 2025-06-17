import { useSearchParams } from 'react-router-dom';

import type { Match, TournamentRoundType, VerticalPosition, HorizontalVariant } from '@/api';

import { MatchLines } from '../MatchLines';
import { PlayerCard } from '../PlayerCard';
import * as styles from './styles.css';

type MatchNodeProps = {
  match: Match;
  isRoot?: boolean;
  side?: 'left' | 'right';
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

const renderRound2RootMatch = (match: Match, readyIds: string[]) => {
  const [semi1, semi2] = match.children ?? [];

  const loserIds = [semi1, semi2].flatMap((semi) => {
    if (!semi?.player1 || !semi?.player2 || !semi.winnerId) return [];
    return semi.player1.id === semi.winnerId ? [semi.player2.id] : [semi.player1.id];
  });

  return (
    <div className={styles.matchBoxNoBorder}>
      <PlayerCard
        player={match.player1}
        isWinner={match.player1?.id === match.winnerId}
        isLoser={!!match.player1 && loserIds.includes(match.player1.id)}
        isLarge
        isReady={isReady(match.player1?.id, readyIds)}
        showStats
        round="ROUND_2"
        side="left"
      />
      <span className={styles.vs}>vs</span>
      <PlayerCard
        player={match.player2}
        isWinner={match.player2?.id === match.winnerId}
        isLoser={!!match.player2 && loserIds.includes(match.player2.id)}
        isLarge
        isReady={isReady(match.player2?.id, readyIds)}
        showStats
        round="ROUND_2"
        side="right"
      />
    </div>
  );
};

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
  round: TournamentRoundType = 'ROUND_4',
) => {
  const isSemifinalLoser = round === 'ROUND_2';
  const showStats = round === 'ROUND_4';
  const player1Loser = match.player1?.id !== match.winnerId;
  const player2Loser = match.player2?.id !== match.winnerId;

  return (
    <>
      {showLine && (
        <MatchLines
          winner={winnerFromTop}
          variant={side}
          highlight={highlight}
          shouldRender={shouldRenderLine}
          round={round}
        />
      )}
      <div className={styles.matchBox}>
        <PlayerCard
          player={match.player1}
          isWinner={match.player1?.id === match.winnerId}
          isLoser={isSemifinalLoser && player1Loser}
          isReady={isReady(match.player1?.id, readyIds)}
          showStats={showStats}
          round={round}
          side={side}
        />
        <span className={styles.vs}>vs</span>
        <PlayerCard
          player={match.player2}
          isWinner={match.player2?.id === match.winnerId}
          isLoser={isSemifinalLoser && player2Loser}
          isReady={isReady(match.player2?.id, readyIds)}
          showStats={showStats}
          round={round}
          side={side}
        />
      </div>
    </>
  );
};

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
    const isRound2Leaf = round === 'ROUND_2';
    const showStats = round === 'ROUND_4';
    const player1Loser = isRound2Leaf && match.player1?.id !== match.winnerId;
    const player2Loser = isRound2Leaf && match.player2?.id !== match.winnerId;

    return (
      <div className={styles.leafWrapper}>
        <PlayerCard
          player={match.player1}
          isWinner={match.player1?.id === match.winnerId}
          isLoser={player1Loser}
          isReady={isReady(match.player1?.id, readyIds)}
          showStats={showStats}
          round={round}
          side={side}
        />
        <MatchLines
          winner={match.winnerId === match.player1?.id ? 'top' : 'bottom'}
          variant={side ?? 'left'}
          highlight={isRound2}
          round={round}
        />
        <PlayerCard
          player={match.player2}
          isWinner={match.player2?.id === match.winnerId}
          isLoser={player2Loser}
          isReady={isReady(match.player2?.id, readyIds)}
          showStats={showStats}
          round={round}
          side={side}
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
                    isRoot && isRound4 ? centerSide : (side ?? 'left'),
                    isRoot && isRound4 ? false : showLine,
                    isRound2,
                    isRoot && isRound4
                      ? centerSide === 'left'
                        ? shouldRenderLeftLine
                        : shouldRenderRightLine
                      : true,
                    readyIds,
                    round,
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
