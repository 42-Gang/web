import { useState, useEffect } from 'react';

import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../components/user-card';

export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname;

  // TODO: 상대방이 들어왔을 때의 로직 구현
  const opponentAvatar = null;
  const isOpponentWaiting = !opponentAvatar;

  const [isPlayerFirst] = useState(() => {
    return !opponentAvatar;
  });

  const playerCard = (
    <UserCard
      userAvatar={playerAvatar ?? null}
      userNickname={playerNickname ?? ''}
      isPlayer={true}
      isWaiting={false}
      mode="1vs1"
      position={isPlayerFirst ? 'left' : 'right'}
    />
  );

  const opponentCard = (
    <UserCard
      userAvatar={opponentAvatar}
      userNickname="OPPONENT"
      isPlayer={false}
      isWaiting={isOpponentWaiting}
      mode="1vs1"
      position={isPlayerFirst ? 'right' : 'left'}
    />
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
            {playerCard}
            <span className={styles.vs}>VS</span>
            {opponentCard}
          </>
        ) : (
          <>
            {opponentCard}
            <span className={styles.vs}>VS</span>
            {playerCard}
          </>
        )}
      </div>

      <p className={waitingClass}>{waitingMessage}</p>
    </Flex>
  );
};
