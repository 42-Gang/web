import { useEffect } from 'react';

import { useUsersMe } from '@/api';
import { useWaitingSocket } from '@/api/socket/useWaitingSocket';
import { useWaitingStore } from '@/api/store/useWaitingStore';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';


import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const meId = data?.data?.id;

  const { socket } = useWaitingSocket();
  const { users, tournamentSize } = useWaitingStore();

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
        {[...Array(tournamentSize)].map((_, index) => {
          const user = users[index];
          const isWaiting = !user;

          return (
            <UserCard
              key={index}
              userAvatar={user?.avatarUrl}
              userNickname={
                isWaiting
                  ? '-'
                  : user.id === meId
                  ? user.nickname
                  : `OPPONENT ${index + 1}`
              }
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
