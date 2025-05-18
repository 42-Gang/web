import { useState } from 'react';

import * as styles from './styles.css';

export type Player = {
  id: string;
  name: string;
  avatarUrl: string;
  win: number;
  lose: number;
  tournament: number;
};

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
  const [showPopup, setShowPopup] = useState(false);

  if (!player) return <div className={isLarge ? styles.emptyLarge : styles.empty} />;

  const wrapperClass = isLarge ? styles.cardLarge : styles.card;
  const borderClass = isReady ? styles.avatarBorder : undefined;
  const avatarClass = styles.avatar;

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className={`${styles.avatarWrapper} ${borderClass}`}>
        <img
          src={player.avatarUrl}
          alt={`${player.name}의 프로필 이미지`}
          className={avatarClass}
        />
        {showPopup && (
          <div
            className={
              isLarge
                ? styles.popupBelowLarge
                : isBottomPosition
                  ? styles.popupAbove
                  : styles.popupBelow
            }
          >
            <div>win: {player.win}</div>
            <div>lose: {player.lose}</div>
            <div>tournament: {player.tournament}</div>
          </div>
        )}
      </div>
      <span className={styles.name}>{player.name}</span>
    </div>
  );
};
