import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  CustomCreateResponse,
  useUsersMe,
  WaitingRoomPlayer,
  WaitingRoomUpdateResponse,
} from '@/api';
import { useSocket } from '@/api/socket';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../_components/user-card';
import { WaitingMessage } from '../../_components/waiting-message';

export const Custom1vs1 = () => {
  const { data } = useUsersMe();
  const uid = data?.data?.id;

  const { socket } = useSocket({
    path: 'waiting',
    handshake: '/ws/main-game',
    withToken: true,
  });

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  const navigate = useNavigate();
  const isAccept = useRef(false);

  const [users, setUsers] = useState<WaitingRoomPlayer[]>([]);

  useEffect(() => {
    if (!socket.connected) return;

    const _size = searchParams.get('size');
    const size = _size ? Number(_size) : NaN;

    if (!roomId && _size && !isNaN(size)) {
      socket.emit('custom-create', { tournamentSize: size });
    }
    if (roomId && !_size && !isAccept.current) {
      socket.emit('custom-accept', { roomId });
    }
  }, [roomId, searchParams, socket, socket.connected]);

  useEffect(() => {
    const handleCustomCreate = (data: CustomCreateResponse) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('roomId', data.roomId);
      navigate(`?${currentParams.toString()}`, { replace: true });
    };

    const handleWaitingRoomUpdate = (data: WaitingRoomUpdateResponse) => {
      setUsers(data.users);
    };

    socket.on('custom-create', handleCustomCreate);
    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    return () => {
      socket.off('custom-create', handleCustomCreate);
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
    };
  }, [searchParams, socket, navigate, users]);

  const me = users.find((u) => u.id === uid);
  const opponent = users.find((u) => u.id !== uid);

  const isHost = me?.isHost ?? false;

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
    isHostUser: isHost,
  };

  const opponentProps = {
    userAvatar: opponent?.avatarUrl,
    userNickname: opponent?.nickname ?? 'OPPONENT',
    isPlayer: false,
    isWaiting: isOpponentWaiting,
    mode: '1vs1' as const,
    option: 'custom' as const,
    isHostUser: isHost,
    isPlayerHost: !isHost,
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
        isHost={isHost}
        onStartGame={() => {
          if (socket && roomId) {
            socket.emit('custom-start', { roomId });
          }
        }}
      />
    </Flex>
  );
};
