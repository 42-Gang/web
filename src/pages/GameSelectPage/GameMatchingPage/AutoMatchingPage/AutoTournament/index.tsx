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
  const [isTournamentStarted, setIsTournamentStarted] = useState(false);

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
      const filteredUsers = data.users.filter((u) => u.id !== meId);
      const converted = filteredUsers.map((u) => ({
        id: u.id,
        nickname: u.nickname,
        avatarUrl: u.avatarUrl,
        win: 0,
        lose: 0,
        tournament: 0,
      }));
      setUsers(converted);
    };

    const handleTournamentCreated = () => {
      setIsNavigatable(false);
      setIsTournamentStarted(true);
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
  }, [socket, tournamentSize, setUsers, meId]);

  useEffect(() => {
    return () => {
      if (socket?.connected && tournamentSize > 0) {
        socket.emit('auto-leave', { tournamentSize });
      }
    };
  }, [socket, tournamentSize]);

  if (!meId) return <div>Loading...</div>;

  const renderUsers = (() => {
    const result: ((typeof users)[number] | undefined)[] = [];

    if (meData?.data) {
      result.push({
        id: meData.data.id,
        nickname: meData.data.nickname,
        avatarUrl: meData.data.avatarUrl,
        win: 0,
        lose: 0,
        tournament: 0,
      });
    }

    if (isTournamentStarted) {
      const others = users.filter((u) => u.id !== meId);
      result.push(...others);
    }

    while (result.length < tournamentSize) {
      result.push(undefined);
    }

    return result;
  })();

  const allMatched = users.length + 1 === tournamentSize;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton onClick={handleBackClick} />
      <h2 className={styles.title}>AUTO TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {renderUsers.map((user, i) => {
          const isWaiting = !user;
          const isPlayer = user?.id === meId;

          const nickname = isWaiting
            ? '-'
            : isPlayer
              ? (meData?.data?.nickname ?? 'ME')
              : (user?.nickname ?? `OPPONENT ${i + 1}`);

          return (
            <UserCard
              key={user?.id ?? `waiting-${i}`}
              userAvatar={user?.avatarUrl}
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
