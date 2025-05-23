import { useState } from 'react';

import type { Player, TournamentRoundType } from '@/api/types/game';

import * as styles from './styles.css';

type PlayerCardProps = {
  player?: Player;
  isWinner?: boolean;
  isLarge?: boolean;
  isReady?: boolean;
  isLoser?: boolean;
  showStats?: boolean;
  round?: TournamentRoundType;
  side?: 'left' | 'right';
};

export const PlayerCard = ({
  player,
  isLarge = false,
  isReady = false,
  isLoser = false,
  showStats = true,
  side = 'left',
  round,
}: PlayerCardProps) => {
  const [showPopup, setShowPopup] = useState(false);

  if (!player) {
    return <div className={isLarge ? styles.emptyLarge : styles.empty} />;
  }

  const { name, avatarUrl, win, lose, tournament } = player;

  const wrapperClass = isLarge ? styles.cardLarge : styles.card;
  const avatarWrapperClass = [styles.avatarWrapper, isReady ? styles.avatarBorder : ''].join(' ');

  const popupClass =
    round === 'ROUND_2'
      ? styles.popupAbove
      : side === 'left'
        ? styles.popupRight
        : styles.popupLeft;

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className={avatarWrapperClass}>
        <img src={avatarUrl} alt={`${name}의 프로필 이미지`} className={styles.avatar} />
        {isLoser && <div className={styles.overlay} />}
        {showStats && showPopup && (
          <div className={popupClass}>
            <div>win: {win}</div>
            <div>lose: {lose}</div>
            <div>tournament: {tournament}</div>
          </div>
        )}
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
