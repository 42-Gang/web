import { useState } from 'react';

import type { Player } from '@/api/types/game';

import * as styles from './styles.css';

type PlayerCardProps = {
  player?: Player;
  isWinner?: boolean;
  isLarge?: boolean;
  isBottomPosition?: boolean;
  isReady?: boolean;
};

export const PlayerCard = ({
  player,
  isLarge = false,
  isBottomPosition = false,
  isReady = false,
}: PlayerCardProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  if (!player) return <div className={isLarge ? styles.emptyLarge : styles.empty} />;

  const { name, avatarUrl, win, lose, tournament } = player;

  const wrapperClass = isLarge ? styles.cardLarge : styles.card;
  const avatarWrapperClass = [styles.avatarWrapper, isReady && styles.avatarBorder]
    .filter(Boolean)
    .join(' ');

  const popupClass = isLarge
    ? styles.popupBelowLarge
    : isBottomPosition
      ? styles.popupAbove
      : styles.popupBelow;

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className={avatarWrapperClass}>
        <img src={avatarUrl} alt={`${name}의 프로필 이미지`} className={styles.avatar} />
        {showPopup && (
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
