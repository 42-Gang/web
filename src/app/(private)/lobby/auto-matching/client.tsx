'use client';

import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { WaitingRoomPlayer } from '~/api';
import { Tiny } from '~/app/_fonts';
import { CloseButton, WaitingText } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useSocket } from '~/socket';
import { UserCard } from '../_components/user-card';
import type { MatchingMode } from './page';

interface Props {
  mode: MatchingMode;
}

export const Client = ({ mode }: Props) => {
  const router = useRouter();
  const [users, setUsers] = useState<WaitingRoomPlayer[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>(false);

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
      setIsMatched(true);
      setTimeout(() => {
        router.replace(`/${routes.lobby_auto}?id=${data.tournamentId}`);
      }, 2000);
    });

    return () => {
      update();
      created();
    };
  }, [socket.socket, socket.isConnected, socket.on, router.replace]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: socket.emit is stable
  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;
    socket.emit('auto-join', { tournamentSize: mode === 'tournament' ? 4 : 2 });
  }, [socket.socket, socket.isConnected, mode]);

  const handleClose = () => {
    if (socket.socket && socket.isConnected) {
      socket.emit('auto-leave', { tournamentSize: mode === 'tournament' ? 4 : 2 });
      router.back();
    }
  };

  return (
    <>
      <CloseButton onClick={handleClose} />

      <div className="center w-full flex-1 gap-10 py-5">
        <Suspense clientOnly>
          <UserCard user={users[0] ?? null} />
        </Suspense>

        <p className={twMerge('text-4xl', Tiny.className)}>VS</p>

        <Suspense clientOnly>
          <UserCard user={users[1] ?? null} />
        </Suspense>
      </div>

      {isMatched ? (
        <p className={twMerge('mb-10 text-4xl text-[#E890C7]', Tiny.className)}>You're matched!</p>
      ) : (
        <WaitingText className="mb-10 text-[#D2F474]" prefix="Waiting for opponent" />
      )}
    </>
  );
};
