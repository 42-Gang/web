'use client';

import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import type { WaitingRoomPlayer } from '~/api';
import { Tiny } from '~/app/_fonts';
import { WaitingText } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useMainGameSocket } from '~/socket';
import { UserCard } from '../../_components/user-card';
import type { MatchingMode } from '../../_types';
import { InviteDialog } from './invite-dialog';

interface Props {
  id: string | null;
  mode: MatchingMode;
  isHost: boolean;
}

export const ClientComponent = ({ id, mode, isHost }: Props) => {
  const router = useRouter();
  const [users, setUsers] = useState<WaitingRoomPlayer[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const socket = useMainGameSocket();

  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;

    const create = socket.on('custom-create', data => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('id', data.roomId);
      searchParams.set('isHost', 'true');
      router.replace(`/${routes.lobby_custom}?${searchParams.toString()}`);
    });
    const update = socket.on('waiting-room-update', data => setUsers(data.users));
    const created = socket.on('tournament-created', data => {
      setIsMatched(true);
      setTimeout(() => {
        router.replace(`/${routes.tournament}?tid=${data.tournamentId}`);
      }, 2500);
    });

    return () => {
      create();
      update();
      created();
    };
  }, [socket.socket, socket.isConnected, socket.on, router.replace]);

  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;

    if (!id) {
      socket.emit('custom-create', { tournamentSize: mode === 'tournament' ? 4 : 2 });
    } else if (!isHost) {
      socket.emit('custom-accept', { roomId: id });
    }
  }, [socket.socket, socket.isConnected, socket.emit, mode, id, isHost]);

  const handleInvite = useCallback(
    (friendId: number) => {
      if (!socket.socket || !socket.isConnected || !id) return;

      socket.emit('custom-invite', { roomId: id, userId: friendId });
      toast.success('Invitation sent!');
    },
    [socket.socket, socket.isConnected, socket.emit, id],
  );

  const handleStartGame = useCallback(() => {
    if (!socket.socket || !socket.isConnected || !id) return;

    socket.emit('custom-start', { roomId: id });
  }, [socket.socket, socket.isConnected, socket.emit, id]);

  return (
    <>
      {mode === '1vs1' ? (
        <div className="center w-full flex-1 gap-10 py-5">
          <Suspense clientOnly>
            {isHost && (users[0] ?? null) === null ? (
              <InviteDialog onInvite={handleInvite}>
                <UserCard user={users[0] ?? null} />
              </InviteDialog>
            ) : (
              <UserCard user={users[0] ?? null} />
            )}
          </Suspense>

          <p className={twMerge('text-4xl', Tiny.className)}>VS</p>

          <Suspense clientOnly>
            {isHost && (users[1] ?? null) === null ? (
              <InviteDialog onInvite={handleInvite}>
                <UserCard user={users[1] ?? null} />
              </InviteDialog>
            ) : (
              <UserCard user={users[1] ?? null} />
            )}
          </Suspense>
        </div>
      ) : (
        <div className="center w-full flex-1 gap-3 py-5">
          {[0, 1, 2, 3].map(idx => {
            const user = users?.[idx] ?? null;
            const isEmpty = user === null;

            return (
              <Suspense key={idx} clientOnly>
                {isHost && isEmpty ? (
                  <InviteDialog onInvite={handleInvite}>
                    <UserCard user={user} className="w-[175px]" />
                  </InviteDialog>
                ) : (
                  <UserCard user={user} className="w-[175px]" />
                )}
              </Suspense>
            );
          })}
        </div>
      )}

      <div className="mb-10 h-11 shrink-0">
        {isHost && users.length === (mode === '1vs1' ? 2 : 4) ? (
          <button
            type="button"
            className={twMerge(
              'h-full shrink-0 cursor-pointer rounded-lg border border-neutral-50 px-3 text-3xl text-[#E890C7] active:translate-y-px',
              Tiny.className,
            )}
            onClick={handleStartGame}
          >
            GAME START
          </button>
        ) : isMatched ? (
          <p className={twMerge('text-4xl text-[#E890C7]', Tiny.className)}>Game starts soon.</p>
        ) : isHost ? (
          <WaitingText className="text-[#D2F474]" prefix="Invite your friend" />
        ) : (
          <WaitingText className="text-[#D2F474]" prefix="Waiting for host" />
        )}
      </div>
    </>
  );
};
