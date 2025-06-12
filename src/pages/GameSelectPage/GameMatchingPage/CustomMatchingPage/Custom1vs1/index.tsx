import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CustomCreateResponse, useUsersMe } from '@/api';
import { useSocket } from '@/api/socket';
import { useWaitingStore } from '@/api/store/useWaitingStateStore.ts';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../_components/user-card';
import { WaitingMessage } from '../../_components/waiting-message';

export const Custom1vs1 = () => {
  const { data } = useUsersMe();
  const uid = data?.data?.id;

  const { socket, connect, disconnect } = useSocket({
    path: 'waiting',
    handshake: '/ws/main-game',
    withToken: true,
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const { users, invitation } = useWaitingStore();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  const navigate = useNavigate();
  const hasCreatedRoom = useRef(false);

  const isHostRef = useRef(!invitation);

  useEffect(() => {
    if (!socket?.connected || hasCreatedRoom.current) return;
    const _size = searchParams.get('size');
    const size = _size ? Number(_size) : NaN;

    if (!roomId && _size && !isNaN(size)) {
      socket.emit('custom-create', { tournamentSize: size });
      hasCreatedRoom.current = true;
    }
  }, [roomId, searchParams, socket]);

  useEffect(() => {
    const handleCustomCreate = (data: CustomCreateResponse) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('roomId', data.roomId);
      navigate(`?${currentParams.toString()}`, { replace: true });
    };

    socket.on('custom-create', handleCustomCreate);
    return () => {
      socket.off('custom-create', handleCustomCreate);
    };
  }, [searchParams, socket, navigate]);

  const me = users.find((u) => u.id === uid);
  const opponent = users.find((u) => u.id !== uid);

  const isMeFirst = users[0]?.id === uid || !opponent;
  const isOpponentWaiting = !opponent;

  const handleInviteFriend = (userId: number) => {
    if (!socket || !roomId) return;
    socket.emit('custom-invite', { roomId, userId });
  };

  const playerProps = {
    userAvatar: me?.avatarUrl,
    userNickname: me?.nickname ?? 'ME',
    isPlayer: true,
    isWaiting: false,
    mode: '1vs1' as const,
    option: 'custom' as const,
    isHostUser: isHostRef.current,
  };

  const opponentProps = {
    userAvatar: opponent?.avatarUrl,
    userNickname: opponent?.nickname ?? 'OPPONENT',
    isPlayer: false,
    isWaiting: isOpponentWaiting,
    mode: '1vs1' as const,
    option: 'custom' as const,
    isHostUser: isHostRef.current,
    isPlayerHost: !isHostRef.current,
    onClickAdd: handleInviteFriend,
  };

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>CUSTOM SOLO</h2>

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

      <WaitingMessage
        isWaiting={isOpponentWaiting}
        option="custom"
        isHost={isHostRef.current}
        onStartGame={() => {
          if (socket && roomId) {
            socket.emit('custom-start', { roomId });
          }
        }}
      />
    </Flex>
  );
};
