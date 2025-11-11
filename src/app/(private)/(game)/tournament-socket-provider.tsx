'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  type PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';
import { queryKeys } from '~/api';
import type { MatchInfoType } from '~/api/types';
import { routes } from '~/constants/routes';
import { useSocket } from '~/socket';

interface TournamentContextValue {
  matchInfo: MatchInfoType | null;
}

interface MatchInfoSetter {
  setMatchInfo: (matchInfo: MatchInfoType | null) => void;
}

interface TournamentSocketManagerProps extends MatchInfoSetter {
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

const TournamentSocketManager = ({ tid, setMatchInfo }: TournamentSocketManagerProps) => {
  const router = useRouter();
  const me = useSuspenseQuery(queryKeys.users.me);

  const tournamentSocket = useSocket({
    path: '/ws/main-game',
    namespace: '/tournament',
    withAuth: true,
    query: { tournamentId: tid },
    forceNew: true,
  });

  useEffect(() => {
    if (!tournamentSocket.socket || !tournamentSocket.isConnected) return;

    const info = tournamentSocket.on('match-info', data => {
      console.log('[tournament-socket-provider] Match info:', data);

      if ('eventType' in data && data.eventType === 'CREATED') {
        const pType = me.data.data.id === data.player1Id ? 'player1' : 'player2';
        const searchParams = new URLSearchParams();
        searchParams.set('server', data.serverName);
        searchParams.set('tid', data.tournamentId.toString());
        searchParams.set('mid', data.matchId.toString());
        searchParams.set('pType', pType);

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
    me.data.data.id,
  ]);

  return null;
};

export const TournamentSocketProvider = ({ children }: PropsWithChildren) => {
  const [matchInfo, setMatchInfo] = useState<MatchInfoType | null>(null);

  return (
    <TournamentContext.Provider value={{ matchInfo }}>
      <Suspense fallback={null}>
        <TournamentSocketProviderInner setMatchInfo={setMatchInfo} />
      </Suspense>
      {children}
    </TournamentContext.Provider>
  );
};

const TournamentSocketProviderInner = ({ setMatchInfo }: MatchInfoSetter) => {
  const searchParams = useSearchParams();
  const tid = searchParams.get('tid');

  console.log(tid);

  if (!(tid && tid.trim().length > 0)) return null;

  return <TournamentSocketManager key={tid} tid={tid} setMatchInfo={setMatchInfo} />;
};
