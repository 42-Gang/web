import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { UserInfo, useSocket, useUsersMe, type WaitingRoomUpdateResponse } from '@/api';
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

  const TOURNAMENT_SIZE = 4;
  const ME_NICKNAME_PLACEHOLDER = 'ME';
  const UNKNOWN_NICKNAME_PLACEHOLDER = '???';
  const DEFAULT_AVATAR_URL = '/assets/images/sample-avatar.png';
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
    setTournamentSize(TOURNAMENT_SIZE);
  }, [setTournamentSize]);

  useEffect(() => {
    if (!socket || !tournamentSize) return;

    const handleWaitingRoomUpdate = (data: WaitingRoomUpdateResponse) => {
      const converted = data.users.map((u) => {
        const isMe = u.id === meId;
        return {
          id: u.id,
          nickname: isMe
            ? (meData?.data?.nickname ?? ME_NICKNAME_PLACEHOLDER)
            : UNKNOWN_NICKNAME_PLACEHOLDER,
          avatarUrl: isMe
            ? (meData?.data?.avatarUrl ?? DEFAULT_AVATAR_URL)
            : RANDOM_PROFILE_AVATAR_URL,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, tournamentSize, setUsers]);

  useEffect(() => {
    return () => {
      if (socket?.connected && TOURNAMENT_SIZE > 0) {
        socket.emit('auto-leave', { tournamentSize: TOURNAMENT_SIZE });
      }
    };
  }, [socket, tournamentSize]);

  if (!meId) return <div>Loading...</div>;

  const renderUsers = (() => {
    const uniqueUsers = users.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id),
    );

    const myUser = uniqueUsers.find((u) => u.id === meId);
    const otherUsers = uniqueUsers.filter((u) => u.id !== meId);

    const paddedOthers: (UserInfo | undefined)[] = [...otherUsers];
    while (paddedOthers.length < TOURNAMENT_SIZE - 1) {
      paddedOthers.push(undefined);
    }

    return [myUser, ...paddedOthers];
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

          const nickname = isWaiting
            ? '-'
            : isPlayer
              ? (meData?.data?.nickname ?? ME_NICKNAME_PLACEHOLDER)
              : UNKNOWN_NICKNAME_PLACEHOLDER;

          const avatarUrl = isWaiting ? undefined : (user?.avatarUrl ?? RANDOM_PROFILE_AVATAR_URL);

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
