import { MatchLines } from '../MatchLines';
import { PlayerCard } from '../PlayerCard';
import * as styles from './styles.css';
import type { Player as PlayerWithStats } from '../PlayerCard';

export type Match = {
  id: string;
  player1?: PlayerWithStats;
  player2?: PlayerWithStats;
  winnerId?: string;
  children?: [Match, Match];
};

type MatchNodeProps = {
  match: Match;
  isRoot?: boolean;
  side?: 'left' | 'right';
  readyIds?: string[];
};

export const MatchNode = ({ match, isRoot = false, side, readyIds = [] }: MatchNodeProps) => {
  const hasChildren = !!match.children;

  const isReady = (id?: string): boolean => !!id && readyIds.includes(id);

  if (!hasChildren) {
    return (
      <div className={styles.leafWrapper}>
        <PlayerCard
          player={match.player1}
          isWinner={match.player1?.id === match.winnerId}
          isBottomPosition={false}
          isReady={false}
        />
        <MatchLines
          winner={match.winnerId === match.player1?.id ? 'top' : 'bottom'}
          variant={side ?? 'left'}
        />
        <PlayerCard
          player={match.player2}
          isWinner={match.player2?.id === match.winnerId}
          isBottomPosition={true}
          isReady={false}
        />
      </div>
    );
  }

  const [left, right] = match.children!;
  const winnerFromLeft = match.winnerId === left.winnerId ? 'top' : 'bottom';

  return (
    <div className={styles.treeWrapper}>
      <div className={styles.roundWrapper}>
        <div className={styles.branchWrapper}>
          <MatchNode match={left} side="left" readyIds={readyIds} />
          <div className={styles.centerColumn}>
            {isRoot ? (
              <div className={styles.matchBoxNoBorder}>
                <PlayerCard
                  player={match.player1}
                  isWinner={match.player1?.id === match.winnerId}
                  isLarge
                  isReady={isReady(match.player1?.id)}
                />
                <span className={styles.vs}>vs</span>
                <PlayerCard
                  player={match.player2}
                  isWinner={match.player2?.id === match.winnerId}
                  isLarge
                  isReady={isReady(match.player2?.id)}
                />
              </div>
            ) : (
              <>
                <MatchLines winner={winnerFromLeft} variant="left" />
                <div className={styles.matchBox}>
                  <PlayerCard
                    player={match.player1}
                    isWinner={match.player1?.id === match.winnerId}
                    isReady={false}
                  />
                  <span className={styles.vs}>vs</span>
                  <PlayerCard
                    player={match.player2}
                    isWinner={match.player2?.id === match.winnerId}
                    isReady={false}
                  />
                </div>
                <MatchLines winner={winnerFromLeft === 'top' ? 'bottom' : 'top'} variant="right" />
              </>
            )}
          </div>
          <MatchNode match={right} side="right" readyIds={readyIds} />
        </div>
      </div>
    </div>
  );
};
