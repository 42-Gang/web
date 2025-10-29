'use client';

import { useSearchParams } from 'next/navigation';
import { createContext, type PropsWithChildren, Suspense, useContext, useEffect, useState } from 'react';
import type { MatchInfoType } from '~/api/types';
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
  const tournamentSocket = useSocket({
    path: '/ws/main-game',
    namespace: '/tournament',
    withAuth: true,
    query: { tournamentId: tid },
  });

  useEffect(() => {
    if (!tournamentSocket.socket || !tournamentSocket.isConnected) return;

    const info = tournamentSocket.on('match-info', data => {
      console.log('[tournament-socket-provider] Match info:', data);
      setMatchInfo(data);
    });

    return () => info();
  }, [tournamentSocket.socket, tournamentSocket.isConnected, tournamentSocket.on, setMatchInfo]);

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

  if (!(tid && tid.trim().length > 0)) return null;

  return <TournamentSocketManager key={tid} tid={tid} setMatchInfo={setMatchInfo} />;
};
