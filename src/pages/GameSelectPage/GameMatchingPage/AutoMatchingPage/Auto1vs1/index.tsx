import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  useUsersMe,
  type TournamentCreatedResponse,
  type WaitingRoomPlayer,
  type WaitingRoomUpdateResponse,
} from '@/api';
import { useSocket } from '@/api/socket';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css.ts';
import { UserCard } from '../../_components/user-card';
import { WaitingMessage } from '../../_components/waiting-message';

export const Auto1vs1 = () => {
  const { data } = useUsersMe();
  const uid = data?.data?.id;

  const { socket } = useSocket({
    path: 'waiting',
    handshake: '/ws/main-game',
    withToken: true,
  });

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  const [users, setUsers] = useState<WaitingRoomPlayer[]>([]);

  useEffect(() => {
    if (!socket.connected) return;

    const _size = searchParams.get('size');
    const size = _size ? Number(_size) : NaN;

    socket.emit('auto-join', { tournamentSize: size });
  }, [roomId, searchParams, socket, socket.connected]);

  useEffect(() => {
    const handleWaitingRoomUpdate = (data: WaitingRoomUpdateResponse) => {
      setUsers(data.users);
    };

    const handleTournamentCreated = (data: TournamentCreatedResponse) => {
      alert(`Tournament created with ID: ${data.tournamentId} and size: ${data.size}`);
    };

    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    socket.on('tournament-created', handleTournamentCreated);
    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
    };
  }, [searchParams, socket, users]);

  const me = users.find((u) => u.id === uid);
  const opponent = users.find((u) => u.id !== uid);

  const isMeFirst = users[0]?.id === uid || !opponent;
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
