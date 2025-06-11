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

export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const meId = data?.data?.id;

  const { socket } = useWaitingSocketStore();
  const [searchParams] = useSearchParams();

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

  const me = users.find((u) => u.id === meId);
  const opponent = users.find((u) => u.id !== meId);

  const isMeFirst = users[0]?.id === meId || !opponent;
  const isOpponentWaiting = !opponent;

  const playerProps = {
    userAvatar: me?.avatarUrl,
    userNickname: me?.nickname ?? 'ME',
    isPlayer: true,
    isWaiting: false,
    mode: '1vs1' as const,
    option: 'auto' as const,
    isHostUser: false,
  };

  const opponentProps = {
    userAvatar: opponent?.avatarUrl,
    userNickname: opponent?.nickname ?? 'OPPONENT',
    isPlayer: false,
    isWaiting: isOpponentWaiting,
    mode: '1vs1' as const,
    option: 'auto' as const,
    isHostUser: false,
  };

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO SOLO</h2>

      <div className={styles.matchArea}>
        {isMeFirst ? (
          <>
            <UserCard key="player" {...playerProps} position="left" />
            <span className={styles.vs}>VS</span>
            <UserCard key="opponent" {...opponentProps} position="right" />
          </>
        ) : (
          <>
            <UserCard key="opponent" {...opponentProps} position="left" />
            <span className={styles.vs}>VS</span>
            <UserCard key="player" {...playerProps} position="right" />
          </>
        )}
      </div>

      <WaitingMessage isWaiting={isOpponentWaiting} option="auto" isHost={false} />
    </Flex>
  );
};
