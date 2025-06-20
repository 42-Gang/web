import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useSocket, useUsersMe, CustomCreateResponse, WaitingRoomUpdateResponse } from '@/api';
import { useGameInviteSocket } from '@/api/socket';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { InviteFriendDialog } from '../../_components/invite-friend-dialog';
import { UserCard } from '../../_components/user-card';
import { WaitingMessage } from '../../_components/waiting-message';

export const CustomTournament = () => {
  useGameInviteSocket();

  const { data } = useUsersMe();
  const meId = data?.data?.id;

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const _size = searchParams.get('size');
  const size = _size ? Number(_size) : NaN;

  const [users, setUsers] = useState<WaitingRoomUpdateResponse['users']>([]);

  const isHostRef = useRef(!roomId);
  const isAcceptRef = useRef(false);
  const navigate = useNavigate();

  const { socket } = useSocket({
    path: 'waiting',
    handshake: '/ws/main-game',
    withToken: true,
  });

  useEffect(() => {
    if (!socket.connected || roomId || !_size || isNaN(size)) return;
    socket.emit('custom-create', { tournamentSize: size });
  }, [roomId, _size, size, socket, socket.connected]);

  useEffect(() => {
    if (!socket.connected || !roomId || isAcceptRef.current) return;
    socket.emit('custom-accept', { roomId });
    isAcceptRef.current = true;
  }, [roomId, socket, socket.connected]);

  useEffect(() => {
    if (!socket) return;

    const handleCustomCreate = (data: CustomCreateResponse) => {
      const currentParams = new URLSearchParams();
      currentParams.set('mode', 'tournament');
      currentParams.set('roomId', data.roomId);
      currentParams.set('size', String(size));
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
  }, [socket, navigate, size]);

  useEffect(() => {
    return () => {
      if (socket && roomId) {
        socket.emit('custom-leave', { roomId });
      }
    };
  }, [socket, roomId]);

  const handleInviteFriend = (userId: number) => {
    if (!socket || !roomId) return;
    socket.emit('custom-invite', {
      roomId,
      userId,
      tournamentSize: size,
    });
  };

  const allMatched = users.length === size;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>CUSTOM TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {Array.from({ length: size }, (_, i) => {
          const user = users[i];
          const isPlayer = user?.id === meId;
          const isWaiting = !user;

          const nickname = isWaiting
            ? '-'
            : isPlayer
              ? (data?.data?.nickname ?? 'ME')
              : (user?.nickname ?? `OPPONENT ${i + 1}`);

          const card = (
            <UserCard
              key={i}
              userAvatar={user?.avatarUrl}
              userNickname={nickname}
              isPlayer={isPlayer}
              isWaiting={isWaiting}
              mode="tournament"
              option="custom"
              isHostUser={isHostRef.current}
              isPlayerHost={user?.id === users[0]?.id}
              onClickAdd={handleInviteFriend}
            />
          );

          return (
            <div key={i}>
              {isWaiting && isHostRef.current ? (
                <InviteFriendDialog onInvite={handleInviteFriend}>{card}</InviteFriendDialog>
              ) : (
                card
              )}
            </div>
          );
        })}
      </div>

      <WaitingMessage
        isWaiting={!allMatched}
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
