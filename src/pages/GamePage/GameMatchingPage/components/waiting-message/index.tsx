import { useEffect, useState } from 'react';

import * as styles from './styles.css';

type WaitingMessageProps = {
  isWaiting: boolean;
  option: 'auto' | 'custom';
  isHost?: boolean;
  onStartGame?: () => void;
};

export const WaitingMessage = ({ isWaiting, option, isHost, onStartGame }: WaitingMessageProps) => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    if (!isWaiting) return;

    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 5) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [isWaiting]);

  const dots = '.'.repeat(dotCount);

  if (option == 'auto') {
    const text = isWaiting ? `Waiting for opponent${dots}` : "You're matched!";
    const className = `${styles.waiting} ${isWaiting ? styles.pending : styles.matched}`;

    return <p className={className}>{text}</p>;
  }

  if (option === 'custom') {
    if (isWaiting) {
      return <p className={`${styles.waiting} ${styles.pending}`}>Invite your friend{dots}</p>;
    }

    if (!isWaiting && isHost) {
      return (
        <div className={styles.readyContainer}>
          <button className={styles.startButton} onClick={onStartGame}>
            Start Game
          </button>
        </div>
      );
    }

    if (!isWaiting && !isHost) {
      return <p className={`${styles.waiting} ${styles.matched}`}>You are matched!</p>;
    }
  }

  return null;
};
