import { useState } from 'react';

import type { Player, TournamentRoundType } from '@/api';

import * as styles from './styles.css.ts';

type PlayerCardProps = {
  player?: Player;
  isReady?: boolean;
  isLoser?: boolean;
  showStats?: boolean;
  round?: TournamentRoundType;
  side?: 'left' | 'right';
};

export const PlayerCard = ({
  player,
  isReady = false,
  isLoser = false,
  showStats = true,
  side = 'left',
  round,
}: PlayerCardProps) => {
  const [showPopup, setShowPopup] = useState(false);

  if (!player) {
    return <div className={styles.empty} />;
  }

  const { name, avatarUrl, win, lose, tournament } = player;

  const avatarWrapperClass = [styles.avatarWrapper, isReady ? styles.avatarBorder : ''].join(' ');

  const popupClass =
    round === 'ROUND_2'
      ? styles.popupAbove
      : side === 'left'
        ? styles.popupRight
        : styles.popupLeft;

  return (
    <div
      className={styles.card}
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
