import { useEffect, useState } from 'react';

import * as styles from './styles.css';

type WaitingMessageProps = {
  isWaiting: boolean;
};

export const WaitingMessage = ({ isWaiting }: WaitingMessageProps) => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    if (!isWaiting) return;

    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 5) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [isWaiting]);

  const dots = '.'.repeat(dotCount);
  const text = isWaiting ? `Waiting for opponents${dots}` : "You're matched!";

  const className = `${styles.waiting} ${isWaiting ? styles.pending : styles.matched}`;

  return <p className={className}>{text}</p>;
};
