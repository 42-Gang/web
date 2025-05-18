import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import { Friend, UserStatusType } from '@/api/types';

import * as styles from './styles.css';

type ProfileCardProps = {
  status?: UserStatusType;
} & Omit<Friend, 'friendId' | 'status'> &
  ComponentProps<'div'>;

export const ProfileCard = ({
  status,
  avatarUrl,
  nickname,
  className,
  ...props
}: ProfileCardProps) => {
  return (
    <div className={clsx(styles.profile, className)} {...props}>
      <img className={styles.avatar} src={avatarUrl} alt={`${nickname}'s Avatar`} />
      <div className={styles.metadata}>
        <p className={styles.nickname}>{nickname}</p>
        <span className={styles.status}>
          <span className={styles.statusIcon({ status })} />
          {status ?? '-'}
        </span>
      </div>
    </div>
  );
};
