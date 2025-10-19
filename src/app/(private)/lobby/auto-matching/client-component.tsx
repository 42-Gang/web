'use client';

import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { WaitingRoomPlayer } from '~/api';
import { Tiny } from '~/app/_fonts';
import { WaitingText } from '~/components/ui';
import { routes } from '~/constants/routes';
import { UserCard } from '../_components/user-card';
import type { MatchingMode } from './page';
import { useMainGameSocket } from '~/socket';

interface Props {
  mode: MatchingMode;
}

export const ClientComponent = ({ mode }: Props) => {
  const router = useRouter();
  const [users, setUsers] = useState<WaitingRoomPlayer[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const socket = useMainGameSocket();

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

  return (
    <>
      {mode === '1vs1' ? (
        <div className="center w-full flex-1 gap-10 py-5">
          <Suspense clientOnly>
            <UserCard user={users[0] ?? null} />
          </Suspense>

          <p className={twMerge('text-4xl', Tiny.className)}>VS</p>

          <Suspense clientOnly>
            <UserCard user={users[1] ?? null} />
          </Suspense>
        </div>
      ) : (
        <div className="center w-full flex-1 gap-3 py-5">
          {[0, 1, 2, 3].map(idx => (
            <Suspense key={idx} clientOnly>
              <UserCard user={users?.[idx] ?? null} className="w-[175px]" />
            </Suspense>
          ))}
        </div>
      )}

      {isMatched ? (
        <p className={twMerge('mb-10 text-4xl text-[#E890C7]', Tiny.className)}>You're matched!</p>
      ) : (
        <WaitingText className="mb-10 text-[#D2F474]" prefix="Waiting for opponent" />
      )}
    </>
  );
};
