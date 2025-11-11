'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { createContext, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { queryKeys } from '~/api';
import type { MatchInfoType } from '~/api/types';
import { routes } from '~/constants/routes';
import { type UseSocketReturn, useSocket } from '~/socket';

interface TournamentContextValue {
  matchInfo: MatchInfoType | null;
  socket: UseSocketReturn | null;
}

interface MatchInfoSetter {
  setMatchInfo: (matchInfo: MatchInfoType | null) => void;
}

interface SocketSetter {
  setSocket: (socket: UseSocketReturn) => void;
}

interface TournamentSocketManagerProps extends MatchInfoSetter, SocketSetter {
  tid: string;
}

const TournamentContext = createContext<TournamentContextValue | null>(null);

export const useTournamentMatchInfo = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournamentMatchInfo must be used within TournamentSocketProvider');
  }
  return context.matchInfo;
};

export const useTournamentSocket = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournamentSocket must be used within TournamentSocketProvider');
  }
  return context.socket;
};

const TournamentSocketManager = ({
  tid,
  setMatchInfo,
  setSocket,
}: TournamentSocketManagerProps) => {
  const router = useRouter();
  const { data: me } = useQuery(queryKeys.users.me);

  const tournamentSocket = useSocket({
    path: '/ws/main-game',
    namespace: '/tournament',
    withAuth: true,
    query: { tournamentId: tid },
    forceNew: true,
  });

  useEffect(() => {
    setSocket(tournamentSocket);
  }, [tournamentSocket, setSocket]);

  useEffect(() => {
    setMatchInfo(null);
  }, [setMatchInfo]);

  useEffect(() => {
    if (!tournamentSocket.socket || !tournamentSocket.isConnected || !me?.data) return;

    const info = tournamentSocket.on('match-info', data => {
      console.log('[tournament-socket-provider] Match info:', data);

      if ('eventType' in data && data.eventType === 'CREATED') {
        const playerType = me.data.id === data.player1Id ? 'player1' : 'player2';
        const searchParams = new URLSearchParams();
        searchParams.set('server', data.serverName);
        searchParams.set('tid', data.tournamentId.toString());
        searchParams.set('mid', data.matchId.toString());
        searchParams.set('playerType', playerType);

        router.push(`/${routes.game}?${searchParams.toString()}`);
        return;
      }

      setMatchInfo(data as MatchInfoType);
    });

    return () => info();
  }, [
    tournamentSocket.socket,
    tournamentSocket.isConnected,
    tournamentSocket.on,
    setMatchInfo,
    me?.data,
    router,
  ]);

  return null;
};

export const TournamentSocketProvider = ({ children }: PropsWithChildren) => {
  const [matchInfo, setMatchInfo] = useState<MatchInfoType | null>(null);
  const [socket, setSocket] = useState<UseSocketReturn | null>(null);

  const handleSetMatchInfo = useCallback((info: MatchInfoType | null) => {
    setMatchInfo(info);
  }, []);

  const handleSetSocket = useCallback((sock: UseSocketReturn) => {
    setSocket(sock);
  }, []);

  return (
    <TournamentContext.Provider value={{ matchInfo, socket }}>
      <Suspense fallback={null}>
        <TournamentSocketProviderInner
          setMatchInfo={handleSetMatchInfo}
          setSocket={handleSetSocket}
        />
      </Suspense>
      {children}
    </TournamentContext.Provider>
  );
};

const TournamentSocketProviderInner = ({
  setMatchInfo,
  setSocket,
}: MatchInfoSetter & SocketSetter) => {
  const searchParams = useSearchParams();
  const tid = searchParams.get('tid');

  console.log(tid);

  if (!(tid && tid.trim().length > 0)) return null;

  return (
    <TournamentSocketManager
      key={tid}
      tid={tid}
      setMatchInfo={setMatchInfo}
      setSocket={setSocket}
    />
  );
};
