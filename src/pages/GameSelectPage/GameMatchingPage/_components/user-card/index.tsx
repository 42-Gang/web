import * as styles from './styles.css.ts';
import { InviteFriendDialog } from '../invite-friend-dialog';

type UserCardProps = {
  userAvatar?: string;
  userNickname: string;
  isPlayer: boolean;
  isWaiting: boolean;
  mode: '1vs1' | 'tournament';
  option: 'auto' | 'custom';
  position?: 'left' | 'right';
  isHostUser: boolean;
  isPlayerHost?: boolean;
  onClickAdd?: (inviteeId: number) => void;
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

  const isCardOwnerHost = isPlayerHost ?? (isPlayer && isHostUser);

  const userCardClass = [
    styles.userCard[mode],
    isPlayer ? styles.playerColor : styles.opponentColor,
    isCardOwnerHost ? styles.hostBorder : '',
  ].join(' ');

  const renderAvatar = () => {
    if (option === 'custom' && !isCurrentUser && isWaiting && isHostUser) {
      return (
        <InviteFriendDialog onInvite={onClickAdd}>
          <button className={styles.addButton} />
        </InviteFriendDialog>
      );
    }

    if (!isWaiting) {
      return (
        <img
          src={userAvatar?.trim() ?? '/assets/sample-avatar.png'}
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
