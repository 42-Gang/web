import { useEffect, useState } from 'react';

import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../components/user-card';

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname;

  // TODO: 상대방이 들어왔을 경우에 대한 처리
  const slots = ['/assets/images/sample1.png', playerAvatar, null, '/assets/images/sample2.png'];

  const [dotCount, setDotCount] = useState(1);
  const allMatched = slots.every((avatar) => avatar !== null);

  useEffect(() => {
    if (allMatched) return;
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 5) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [allMatched]);

  const dots = '.'.repeat(dotCount);
  const waitingClass = `${styles.waiting} ${allMatched ? styles.waitingMatched : styles.waitingPending}`;
  const waitingMessage = allMatched ? "You're matched!" : `[ Waiting for opponents${dots} ]`;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {slots.map((avatar, index) => {
          const isPlayer = avatar === playerAvatar;
          const isWaiting = avatar === null;

          return (
            <UserCard
              key={index}
              userAvatar={avatar || null}
              userNickname={
                isWaiting ? '-' : isPlayer ? (playerNickname ?? '') : `OPPONENT ${index + 1}`
              }
              isPlayer={isPlayer}
              isWaiting={isWaiting}
              mode="tournament"
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          );
        })}
      </div>

      <p className={waitingClass}>{waitingMessage}</p>
    </Flex>
  );
};
