import * as styles from './styles.css';

type userStatusProps = {
  status: 'ONLINE' | 'OFFLINE' | 'AWAY' | 'GAME';
};

export const UserStatus = ({ status }: userStatusProps) => {
  const statusKey = status.toLowerCase() as keyof typeof styles.statusDot;

  return <span className={styles.statusDot[statusKey]} />;
};
