import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUsersMe } from '@/api';
import { useWaitingSocketStore } from '@/api/store/useWaitingSocketStore';
import { useWaitingStore } from '@/api/store/useWaitingStateStore';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const meId = data?.data?.id;

  const [searchParams] = useSearchParams();
  const { socket } = useWaitingSocketStore();

  const { users, tournamentSize, setTournamentSize } = useWaitingStore();

  useEffect(() => {
    const size = searchParams.get('size');
    if (size) {
      const parsed = Number(size);
      if (!isNaN(parsed)) {
        setTournamentSize(parsed);
      }
    }
  }, [searchParams, setTournamentSize]);

  useEffect(() => {
    if (!socket || !socket.connected || tournamentSize === 0) return;
    socket.emit('auto-join', { tournamentSize });
  }, [socket, tournamentSize]);

  const allMatched = users.length === tournamentSize;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {[...Array(tournamentSize || 4)].map((_, index) => {
          const user = users[index];
          const isWaiting = !user;
          const isPlayer = user?.id === meId;

          return (
            <UserCard
              key={index}
              userAvatar={user?.avatarUrl}
              userNickname={isWaiting ? '-' : isPlayer ? user.nickname : `OPPONENT ${index + 1}`}
              isPlayer={user?.id === meId}
              isWaiting={isWaiting}
              mode="tournament"
              option="auto"
              isHostUser={false}
            />
          );
        })}
      </div>

      <WaitingMessage isWaiting={!allMatched} option="auto" isHost={false} />
    </Flex>
  );
};
