'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { queryKeys } from '~/api';
import { CTAButton, WaitingText } from '~/components/ui';
import { useTournament } from '../tournament-socket-provider';

export const ClientComponents = () => {
  const { matchInfo, socket, readyPlayerIds } = useTournament();
  const { data: me } = useSuspenseQuery(queryKeys.users.me);

  const handleReady = useCallback(() => {
    if (!socket) return;
    socket.emit('ready', {});
    console.log('[tournament/page] Ready emitted');
  }, [socket]);

  if (!matchInfo) return <TournamentLoading />;

  const { mode, size, players } = matchInfo;
  const currentUserId = me.data.id;
  const isCurrentUserReady = currentUserId ? readyPlayerIds.includes(currentUserId) : false;

  return (
    <div className="column-between h-full">
      <div className="column-center-x">
        <h1 className={twMerge('mt-10 font-bold text-5xl text-white')}>Tournament Match</h1>

        <p className="mt-2 font-bold text-2xl">
          {mode} {size === 2 ? '1vs1' : 'Free For All'} Match
        </p>
      </div>

      <div className="center-y gap-12">
        {players.map(player => (
          <div key={player.userId} className="column-center-x">
            <div
              className={twMerge(
                'size-[84px] overflow-hidden rounded-full border-2 border-transparent',
                readyPlayerIds.includes(player.userId) ? 'border-green-500' : '',
              )}
            >
              <Image
                width={84}
                height={84}
                src={player.profileImage}
                alt={`${player.userId} 이미지`}
              />
            </div>
            <p className="mt-1 text-xl">{player.nickname}</p>
          </div>
        ))}
      </div>

      <CTAButton className="mb-10" size="md" disabled={isCurrentUserReady} onClick={handleReady}>
        {isCurrentUserReady ? 'Waiting...' : 'Ready'}
      </CTAButton>
    </div>
  );
};

const TournamentLoading = () => {
  return (
    <div className="center size-full text-center">
      <WaitingText className="text-xl" prefix="Tournament Loading..." />
    </div>
  );
};
