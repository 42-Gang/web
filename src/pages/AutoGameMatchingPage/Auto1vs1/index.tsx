import { useState, useEffect } from 'react';

import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';

export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname;

  // TODO: 상대방이 들어왔을 때의 로직 구현
  const opponentAvatar = null;
  const isOpponentWaiting = !opponentAvatar;

  const isPlayerFirst = !!playerAvatar && !opponentAvatar;

  const PlayerCard = (
    <div className={styles.playerCard}>
      <div className={styles.avatar}>
        <img src={playerAvatar} alt="My avatar" className={styles.avatarImage} />
      </div>
      <img src="/assets/images/gun.svg" alt="gun" className={styles.gun} />
      <p className={styles.nickname}>{playerNickname}</p>
    </div>
  );

  const OpponentCard = (
    <div className={styles.opponentCard}>
      <div className={styles.avatar}>
        {isOpponentWaiting ? (
          <img src="/assets/images/spinner.svg" alt="spinner" className={styles.spinner} />
        ) : (
          <img src={opponentAvatar} alt="opponent avatar" className={styles.avatarImage} />
        )}
      </div>
      <img src="/assets/images/gun.svg" alt="gun" className={styles.gun} />
      <p className={styles.nickname}>{isOpponentWaiting ? '-' : 'OPPONENT'}</p>
    </div>
  );

  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    if (!isOpponentWaiting) return;

    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 5) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [isOpponentWaiting]);

  const dots = '.'.repeat(dotCount);

  const waitingClass = `${styles.waiting} ${isOpponentWaiting ? styles.waitingPending : styles.waitingMatched}`;
  const waitingMessage = isOpponentWaiting ? `[ Waiting for opponents${dots} ]` : "You're matched!";

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO SOLO</h2>

      <div className={styles.matchArea}>
        {isPlayerFirst ? (
          <>
            {PlayerCard}
            <span className={styles.vs}>VS</span>
            {OpponentCard}
          </>
        ) : (
          <>
            {OpponentCard}
            <span className={styles.vs}>VS</span>
            {PlayerCard}
          </>
        )}
      </div>

      <p className={waitingClass}>{waitingMessage}</p>
    </Flex>
  );
};
