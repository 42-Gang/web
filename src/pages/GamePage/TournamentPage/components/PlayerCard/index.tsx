import { useState } from 'react';

import type { Player, TournamentRoundType } from '@/api';

import * as styles from './styles.css.ts';

const TOURNAMENT_ROUNDS = {
  FINAL: 'ROUND_2',
  SEMI_FINAL: 'ROUND_4',
} as const;

const PLAYER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

const PLAYER_STATS_LABELS = {
  WIN: 'win',
  LOSE: 'lose',
  TOURNAMENT: 'tournament',
} as const;

type PlayerCardProps = {
  player?: Player;
  isReady?: boolean;
  isLoser?: boolean;
  isWinner?: boolean;
  showStats?: boolean;
  round?: TournamentRoundType;
  side?: string;
};

type PlayerStats = {
  win: number;
  lose: number;
  tournament: number;
};

const getPopupPositionClass = (round: TournamentRoundType, side: string): string => {
  if (round === TOURNAMENT_ROUNDS.FINAL) {
    return styles.popupAbove;
  }

  return side === PLAYER_POSITIONS.LEFT ? styles.popupRight : styles.popupLeft;
};

const buildAvatarWrapperClasses = (isReady: boolean, isWinner: boolean): string => {
  const classes = [styles.avatarWrapper];

  if (isReady) classes.push(styles.avatarBorder);
  if (isWinner) classes.push(styles.winnerBorder);

  return classes.join(' ');
};

const renderPlayerStats = (stats: PlayerStats) => (
  <>
    <div>
      {PLAYER_STATS_LABELS.WIN}: {stats.win}
    </div>
    <div>
      {PLAYER_STATS_LABELS.LOSE}: {stats.lose}
    </div>
    <div>
      {PLAYER_STATS_LABELS.TOURNAMENT}: {stats.tournament}
    </div>
  </>
);

const renderEmptyPlayerCard = () => <div className={styles.empty} />;

export const PlayerCard = ({
  player,
  isReady = false,
  isLoser = false,
  isWinner = false,
  showStats = true,
  side = PLAYER_POSITIONS.LEFT,
  round,
}: PlayerCardProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  if (!player) {
    return renderEmptyPlayerCard();
  }

  const { name, avatarUrl, win, lose, tournament } = player;
  const playerStats: PlayerStats = { win, lose, tournament };

  const avatarWrapperClass = buildAvatarWrapperClasses(isReady, isWinner);
  const popupPositionClass = round ? getPopupPositionClass(round, side) : '';

  const handleMouseEnter = () => setIsPopupVisible(true);
  const handleMouseLeave = () => setIsPopupVisible(false);

  return (
    <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={avatarWrapperClass}>
        <img src={avatarUrl} alt={`${name}의 프로필 이미지`} className={styles.avatar} />
        {isLoser && <div className={styles.overlay} />}
        {showStats && isPopupVisible && (
          <div className={popupPositionClass}>{renderPlayerStats(playerStats)}</div>
        )}
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
