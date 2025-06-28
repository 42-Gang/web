import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { UserInfo, useSocket, useUsersMe, type WaitingRoomUpdateResponse } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../_components/user-card';
import { WaitingMessage } from '../../_components/waiting-message';

export const AutoTournament = () => {
  const { data } = useUsersMe();
  const user = data?.data;
  const [users, setUsers] = useState<UserInfo[]>([]);

  const [searchParams] = useSearchParams();
  const tournamentSize = Number(searchParams.get('size') || 0);

  const TOURNAMENT_SIZE = 4;
  const UNKNOWN_NICKNAME_PLACEHOLDER = '???';
  const RANDOM_PROFILE_AVATAR_URL = '/assets/images/tournament-random-profile.png';

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
    if (!socket || !tournamentSize || !user) return;

    const handleWaitingRoomUpdate = (data: WaitingRoomUpdateResponse) => {
      const converted = data.users.map((u) => {
        const me: boolean = u.id === user.id;

        return {
          id: u.id,
          nickname: me ? user.nickname : UNKNOWN_NICKNAME_PLACEHOLDER,
          avatarUrl: me ? user.avatarUrl : RANDOM_PROFILE_AVATAR_URL,
          win: me ? user.win : 0,
          lose: me ? user.lose : 0,
          tournament: me ? user.tournament : 0,
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
      socket.emit('auto-join', { tournamentSize: TOURNAMENT_SIZE });
    };

    if (socket.connected) {
      emitJoin();
    } else {
      socket.once('connect', emitJoin);
    }

    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
    };
  }, [socket, tournamentSize, setUsers, user]);

  useEffect(() => {
    return () => {
      socket.emit('auto-leave', { tournamentSize: TOURNAMENT_SIZE });
    };
  }, [socket, tournamentSize]);

  if (!user) return <div>Loading...</div>;

  const renderUsers = [...new Map(users.map((u) => [u.id, u])).values()];
  const allMatched = users.length === tournamentSize;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton onClick={handleBackClick} />
      <h2 className={styles.title}>AUTO TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {renderUsers.map((u) => (
          <UserCard
            key={u.id}
            userAvatar={u.avatarUrl}
            userNickname={u.nickname}
            isPlayer={u.id === user.id}
            isWaiting={false}
            mode="tournament"
            option="auto"
            isHostUser={false}
          />
        ))}
        {Array.from({ length: tournamentSize - renderUsers.length }, (_, i) => (
          <UserCard
            key={`waiting-${i}`}
            userAvatar={RANDOM_PROFILE_AVATAR_URL}
            userNickname={UNKNOWN_NICKNAME_PLACEHOLDER}
            isPlayer={false}
            isWaiting={true}
            mode="tournament"
            option="auto"
            isHostUser={false}
          />
        ))}
      </div>

      <WaitingMessage isWaiting={!allMatched} option="auto" isHost={false} />
    </Flex>
  );
};
