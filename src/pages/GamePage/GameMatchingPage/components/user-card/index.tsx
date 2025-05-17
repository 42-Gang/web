import * as styles from './styles.css';

type UserCardProps = {
  userAvatar: string | null;
  userNickname: string;
  isPlayer: boolean; // 현재 유저인지 여부
  isWaiting: boolean;
  mode: '1vs1' | 'tournament';
  option: 'auto' | 'custom';
  position?: 'left' | 'right';
  isHostUser: boolean; // 현재 유저가 방장인지
  isPlayerHost?: boolean;
  onClickAdd?: () => void;
};

export const UserCard = ({
  userAvatar,
  userNickname,
  isPlayer,
  isWaiting,
  mode,
  option,
  position,
  isHostUser,
  isPlayerHost,
  onClickAdd,
}: UserCardProps) => {
  const shouldFlipGun = mode === '1vs1' && position === 'right';

  const isCurrentUser = isPlayer;

  // 카드 주인이 방장인지: 외부에서 전달되면 사용, 없으면 내부 계산
  const isCardOwnerHost = isPlayerHost ?? (isPlayer && isHostUser);

  const userCardClass = [
    styles.userCard[mode],
    isPlayer ? styles.playerColor : styles.opponentColor,
    isCardOwnerHost ? styles.hostBorder : '',
  ].join(' ');

  const renderAvatar = () => {
    if (option === 'custom' && !isCurrentUser && isWaiting && isHostUser) {
      return <button className={styles.addButton} onClick={onClickAdd} />;
    }

    if (!isWaiting) {
      return (
        <img
          src={userAvatar ?? ''}
          alt={isPlayer ? 'user avatar' : 'opponent avatar'}
          className={styles.avatarImage}
        />
      );
    }

    if (option === 'auto') {
      return <img src="/assets/images/spinner.svg" alt="spinner" className={styles.spinner} />;
    }

    return null;
  };

  return (
    <div className={userCardClass}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatar}>{renderAvatar()}</div>
        {isCardOwnerHost && <p className={styles.masterLabel}>Master</p>}
      </div>

      <div className={styles.gunWrapper}>
        <img
          src="/assets/images/gun.svg"
          alt="gun"
          className={shouldFlipGun ? styles.gunReversed : styles.gun}
        />
      </div>

      <p className={styles.nickname}>{isWaiting ? '-' : userNickname}</p>
    </div>
  );
};
