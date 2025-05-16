import * as styles from './styles.css';

type UserCardProps = {
  userAvatar: string | null;
  userNickname: string;
  isPlayer: boolean;
  isCurrentUser?: boolean;
  isWaiting: boolean;
  mode: '1vs1' | 'tournament';
  option: 'auto' | 'custom';
  position: 'left' | 'right';
  isPlayerHost: boolean; // 카드 주인이 방장인지
  isHostUser: boolean; // 현재 유저가 방장인지
  onClickAdd?: () => void;
};

export const UserCard = ({
  userAvatar,
  userNickname,
  isPlayer,
  isCurrentUser,
  isWaiting,
  mode,
  option,
  position,
  isPlayerHost,
  isHostUser,
  onClickAdd,
}: UserCardProps) => {
  const shouldFlipGun = mode === '1vs1' && position === 'right';

  const userCardClass = [
    styles.userCard[mode], // ✅ mode에 따라 variant style 적용됨
    isPlayer ? styles.playerColor : styles.opponentColor,
    isPlayerHost ? styles.hostBorder : '',
  ].join(' ');

  const renderAvatar = () => {
    if (
      option === 'custom' &&
      !isCurrentUser &&
      isWaiting &&
      isHostUser // 현재 유저가 방장일 때만 초대 버튼 표시
    ) {
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
        {isPlayerHost && <p className={styles.masterLabel}>Master</p>}
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
