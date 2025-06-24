import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useSocket, useUsersMe, type WaitingRoomUpdateResponse } from '@/api';
import { useWaitingStore } from '@/api/store/useWaitingStateStore';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../_components/user-card';
import { WaitingMessage } from '../../_components/waiting-message';

export const AutoTournament = () => {
  const { data: meData } = useUsersMe();
  const meId = meData?.data?.id;

  const [searchParams] = useSearchParams();
  const tournamentSize = Number(searchParams.get('size') || 0);

  const { users, setUsers, setTournamentSize } = useWaitingStore();

  const { socket } = useSocket({
    path: 'waiting',
    handshake: '/ws/main-game',
    withToken: true,
  });

  const navigate = useNavigate();
  const [isNavigatable, setIsNavigatable] = useState(true);

  const handleBackClick = () => {
    if (!isNavigatable) {
      toast.error('토너먼트가 시작되어 페이지를 이동할 수 없습니다.');
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    if (!isNaN(tournamentSize) && tournamentSize > 0) {
      setTournamentSize(tournamentSize);
    }
  }, [tournamentSize, setTournamentSize]);

  useEffect(() => {
    if (!socket || !tournamentSize) return;

    const handleWaitingRoomUpdate = (data: WaitingRoomUpdateResponse) => {
      const converted = data.users.map((u) => {
        const isMe = u.id === meId;
        return {
          id: u.id,
          nickname: isMe ? (meData?.data?.nickname ?? 'ME') : '???',
          avatarUrl: isMe
            ? (meData?.data?.avatarUrl ?? '/assets/images/sample-avatar.png')
            : '/assets/images/tournament-random-profile.png',
          win: isMe ? (meData?.data?.win ?? 0) : 0,
          lose: isMe ? (meData?.data?.lose ?? 0) : 0,
          tournament: isMe ? (meData?.data?.tournament ?? 0) : 0,
        };
      });

      setUsers(converted);
    };

    const handleTournamentCreated = () => {
      setIsNavigatable(false);
    };

    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    socket.on('tournament-created', handleTournamentCreated);

    const emitJoin = () => {
      socket.emit('auto-join', { tournamentSize });
    };

    if (socket.connected) {
      setTimeout(emitJoin, 50);
    } else {
      socket.once('connect', emitJoin);
    }

    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, tournamentSize, setUsers]);

  useEffect(() => {
    return () => {
      if (socket?.connected && tournamentSize > 0) {
        socket.emit('auto-leave', { tournamentSize });
      }
    };
  }, [socket, tournamentSize]);

  useEffect(() => {
    // const handleLeaveSuccess = (data: unknown) => {
    //   const message = data as string;
    //   console.log('Leave success:', message);
    // };
    const handleLeaveSuccess = () => {};

    if (!socket) return;

    socket.on('leave-success', handleLeaveSuccess);

    return () => {
      socket.off('leave-success', handleLeaveSuccess);
    };
  }, [socket]);

  if (!meId) return <div>Loading...</div>;

  const renderUsers = (() => {
    const uniqueUsers = users.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id),
    );

    const paddedUsers = [...uniqueUsers] as ((typeof users)[number] | undefined)[];

    while (paddedUsers.length < tournamentSize) {
      paddedUsers.push(undefined);
    }

    return paddedUsers.slice(0, tournamentSize);
  })();

  const allMatched = users.length === tournamentSize;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton onClick={handleBackClick} />
      <h2 className={styles.title}>AUTO TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {renderUsers.map((user, i) => {
          const isWaiting = !user;
          const isPlayer = user?.id === meId;

          const nickname = isWaiting ? '-' : isPlayer ? (meData?.data?.nickname ?? 'ME') : '???';

          const avatarUrl = isWaiting
            ? undefined
            : (user?.avatarUrl ?? '/assets/images/tournament-random-profile.png');

          return (
            <UserCard
              key={user?.id ?? `waiting-${i}`}
              userAvatar={avatarUrl}
              userNickname={nickname}
              isPlayer={isPlayer}
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
