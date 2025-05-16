import * as styles from './styles.css';

type UserCardProps = {
  userAvatar: string | null;
  userNickname: string;
  isPlayer: boolean;
  isWaiting?: boolean;
  mode?: '1vs1' | 'tournament';
  position: 'left' | 'right';
};

export const UserCard = ({
  userAvatar,
  userNickname,
  isPlayer,
  position,
  isWaiting = false,
  mode = '1vs1',
}: UserCardProps) => {
  const shouldFlipGun = mode === '1vs1' && position === 'right';
  const userCardClass = `${styles.userCard} ${isPlayer ? styles.playerColor : styles.opponentColor}`;

  return (
    <div className={userCardClass}>
      <div className={styles.avatar}>
        {isWaiting ? (
          <img src="/assets/images/spinner.svg" alt="spinner" className={styles.spinner} />
        ) : (
          <img
            src={userAvatar ?? ''}
            alt={isPlayer ? 'user avatar' : 'opponent avatar'}
            className={styles.avatarImage}
          />
        )}
      </div>
      <img
        src="/assets/images/gun.svg"
        alt="gun"
        className={shouldFlipGun ? styles.gunReversed : styles.gun}
      />
      <p className={styles.nickname}>{isWaiting ? '-' : userNickname}</p>
    </div>
  );
};
