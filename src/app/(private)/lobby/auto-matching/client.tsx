'use client';

import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { WaitingRoomPlayer } from '~/api';
import { UserCard } from '~/app/(private)/lobby/_components/user-card';
import { WaitingText } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useSocket } from '~/socket';
import type { MatchingMode } from './page';

interface Props {
  mode: MatchingMode;
}

export const Client = ({ mode }: Props) => {
  const router = useRouter();
  const [users, setUsers] = useState<WaitingRoomPlayer[]>([]);

  const socket = useSocket({
    path: '/ws/main-game',
    namespace: '/waiting',
    withAuth: true,
    autoConnect: true,
    autoDisconnect: false,
    autoReconnect: true,
  });

  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;

    const update = socket.on('waiting-room-update', data => setUsers(data.users));
    const created = socket.on('tournament-created', data => {
      router.replace(`/${routes.lobby_auto}?id=${data.tournamentId}`);
    });

    return () => {
      update();
      created();
    };
  }, [socket.socket, socket.isConnected, socket.on, router.replace]);

  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;
    socket.emit('auto-join', { tournamentSize: mode === 'tournament' ? 4 : 2 });
  }, [socket.socket, socket.isConnected, socket.emit, mode]);

  return (
    <>
      <div className="center w-full flex-1 gap-6 py-5">
        <Suspense clientOnly>{users.length > 0 && <UserCard user={users[0]} />}</Suspense>
        <p className="text-5xl">VS</p>
        <Suspense clientOnly>{users.length > 1 && <UserCard user={users[1]} />}</Suspense>
      </div>
      <WaitingText className="mb-10 text-[#D2F474]" prefix="Waiting for opponent" />
    </>
  );
};
