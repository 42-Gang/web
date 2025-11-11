'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { queryKeys } from '~/api';
import { useTournament } from '../tournament-socket-provider';

export const ClientComponents = () => {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get('tid');

  const { data: me } = useQuery(queryKeys.users.me);

  const { matchInfo, socket, readyPlayerIds, gameResult } = useTournament();

  const handleReady = useCallback(() => {
    if (!tournamentId) return;
    socket?.emit('ready', {});
    console.log('[tournament/page] Ready emitted');
  }, [tournamentId, socket]);

  if (!matchInfo) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-lg">대기 중...</p>
      </div>
    );
  }

  const { mode, size, players } = matchInfo;
  const currentUserId = me?.data?.id;
  const isCurrentUserReady = currentUserId ? readyPlayerIds.includes(currentUserId) : false;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">토너먼트 정보</h2>
        <div className="flex gap-4">
          <p>
            <span className="font-semibold">모드:</span> {mode}
          </p>
          <p>
            <span className="font-semibold">인원:</span> {size}명
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-xl">참가자 목록</h3>
        <div className="flex flex-col gap-2">
          {players.map(player => {
            const isReady = readyPlayerIds.includes(player.userId);
            const isEliminated = player.state === 'ELIMINATED';
            const isPlaying = player.state === 'PLAYING';

            return (
              <div key={player.userId} className="flex items-center gap-4 rounded border p-3">
                <Image
                  src={player.profileImage}
                  alt={player.nickname}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold">{player.nickname}</p>
                  <p className="text-gray-600 text-sm">
                    {isEliminated && '탈락'}
                    {isPlaying && '게임 중'}
                    {!isEliminated && !isPlaying && isReady && '준비 완료'}
                    {!isEliminated && !isPlaying && !isReady && '대기 중'}
                  </p>
                </div>
                {isReady && !isEliminated && !isPlaying && (
                  <span className="rounded bg-green-500 px-2 py-1 text-sm text-white">✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-gray-600 text-sm">
          준비 완료: {readyPlayerIds.length} / {players.length}
        </p>
        {socket?.isConnected ? (
          <button
            onClick={handleReady}
            type="button"
            disabled={isCurrentUserReady}
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isCurrentUserReady ? '준비 완료됨' : '준비 완료'}
          </button>
        ) : (
          <p className="text-red-500">소켓 연결 중...</p>
        )}
      </div>

      {gameResult && (
        <div className="mt-4 rounded border border-green-500 bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-xl">게임 결과</h3>
          <p>
            <span className="font-semibold">승자:</span> Player {gameResult.winnerId}
          </p>
          <p>
            <span className="font-semibold">스코어:</span> {gameResult.score.player1} :{' '}
            {gameResult.score.player2}
          </p>
          <p>
            <span className="font-semibold">라운드:</span> {gameResult.round}
          </p>
        </div>
      )}
    </div>
  );
};
