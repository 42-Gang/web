import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useUsersMe } from '@/api';
import { useWaitingSocket } from '@/api/socket/useWaitingSocket';
import { useWaitingStore } from '@/api/store/useWaitingStore';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';


import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';


export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname ?? '';

  const { users } = useWaitingStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tournamentSize = Number(searchParams.get('size') || '2');

  const { socket } = useWaitingSocket();

  useEffect(() => {
    if (!socket) return;
    socket.emit('auto-join', { tournamentSize });
  }, [socket, tournamentSize]);

  const opponent = Array.isArray(users)
    ? users.find((u) => u && u.nickname !== playerNickname)
    : undefined;

  const isPlayerFirst = !opponent || playerNickname < opponent.nickname;
  const isOpponentWaiting = !opponent;

  const playerProps = {
    userAvatar: playerAvatar,
    userNickname: playerNickname,
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
        {isPlayerFirst ? (
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
