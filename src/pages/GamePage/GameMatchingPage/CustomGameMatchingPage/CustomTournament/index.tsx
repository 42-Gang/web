import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUsersMe } from '@/api';
import { useWaitingSocket } from '@/api/socket/useWaitingSocket';
import { useWaitingStore } from '@/api/store/useWaitingStore';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { InviteFriendDialog } from '../../components/invite-friend-dialog';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const meId = data?.data?.id;

  const { socket } = useWaitingSocket();
  const { users, tournamentSize, roomId, invitation, setTournamentSize } = useWaitingStore();

  const [searchParams] = useSearchParams();

  const isHostRef = useRef(!invitation);

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
    if (isHostRef.current) {
      socket.emit('custom-create', { tournamentSize });
    }
  }, [socket, tournamentSize]);

  useEffect(() => {
    return () => {
      if (socket && roomId) {
        socket.emit('custom-leave', { roomId });
      }
      useWaitingStore.getState().clearRoom();
      useWaitingStore.getState().clearInvitation();
    };
  }, [socket, roomId]);

  const handleInviteFriend = (userId: number) => {
    if (!socket || !roomId) return;
    socket.emit('custom-invite', { roomId, userId });
  };

  const allMatched = users.length === tournamentSize;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>CUSTOM TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {Array.from({ length: tournamentSize || 4 }, (_, i) => {
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
