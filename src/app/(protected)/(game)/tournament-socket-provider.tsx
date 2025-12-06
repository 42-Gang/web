'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { queryKeys } from '~/api';
import type { GameResultResponse, MatchInfoType, ReadyResponse } from '~/api/types';
import { routes } from '~/constants/routes';
import { type UseSocketReturn, useSocket } from '~/socket';

interface TournamentContextValue {
  matchInfo: MatchInfoType | null;
  socket: UseSocketReturn | null;
  readyPlayerIds: number[];
  gameResult: GameResultResponse | null;
}

interface MatchInfoSetter {
  setMatchInfo: (matchInfo: MatchInfoType | null) => void;
}

interface SocketSetter {
  setSocket: (socket: UseSocketReturn) => void;
}

interface ReadyPlayerIdsSetter {
  setReadyPlayerIds: (updater: (prev: number[]) => number[]) => void;
}

interface GameResultSetter {
  setGameResult: (gameResult: GameResultResponse | null) => void;
}

interface TournamentSocketManagerProps
  extends MatchInfoSetter,
    SocketSetter,
    ReadyPlayerIdsSetter,
    GameResultSetter {
  tid: string;
}

const TournamentContext = createContext<TournamentContextValue | null>(null);

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within TournamentSocketProvider');
  }
  return context;
};

const TournamentSocketManager = ({
  tid,
  setMatchInfo,
  setSocket,
  setReadyPlayerIds,
  setGameResult,
}: TournamentSocketManagerProps) => {
  const router = useRouter();
  const { data: me } = useQuery(queryKeys.users.me);

  const tournamentSocket = useSocket({
    path: '/ws/main-game',
    namespace: '/tournament',
    query: { tournamentId: tid },
    withAuth: true,
    forceNew: true,
  });

  const socketInstanceRef = useRef<typeof tournamentSocket.socket | null>(null);
  const isConnectedRef = useRef<boolean>(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: if add tournamentSocket, it will cause infinite loop
  useEffect(() => {
    const hasSocketChanged = socketInstanceRef.current !== tournamentSocket.socket;
    const hasConnectionChanged = isConnectedRef.current !== tournamentSocket.isConnected;

    if (hasSocketChanged || hasConnectionChanged) {
      socketInstanceRef.current = tournamentSocket.socket;
      isConnectedRef.current = tournamentSocket.isConnected;
      setSocket(tournamentSocket);
    }
  }, [tournamentSocket.socket, tournamentSocket.isConnected, setSocket]);

  useEffect(() => {
    setMatchInfo(null);
    setReadyPlayerIds(() => []);
    setGameResult(null);
  }, [setMatchInfo, setReadyPlayerIds, setGameResult]);

  useEffect(() => {
    if (!tournamentSocket.socket || !me?.data) return;

    const matchInfo = tournamentSocket.on('match-info', data => {
      console.log('[tournament-socket-provider] Match info:', data);

      if ('eventType' in data && data.eventType === 'CREATED') {
        const playerType = me.data.id === data.player1Id ? 'player1' : 'player2';
        const searchParams = new URLSearchParams();
        searchParams.set('server', data.serverName);
        searchParams.set('tid', data.tournamentId.toString());
        searchParams.set('mid', data.matchId.toString());
        searchParams.set('playerType', playerType);

        setTimeout(() => {
          router.push(`/${routes.game}?${searchParams.toString()}`);
        }, 1000);
        return;
      }

      setMatchInfo(data as MatchInfoType);
      setReadyPlayerIds(() =>
        (data as MatchInfoType).players.filter(p => p.state === 'READY').map(p => p.userId),
      );
    });

    const ready = tournamentSocket.on('ready', (data: ReadyResponse) => {
      console.log('[tournament-socket-provider] Ready info:', data);

      if (data.type === 'all-users-ready') {
        console.log('[tournament-socket-provider] All users ready');
      }

      setReadyPlayerIds(prev => {
        if (prev.includes(data.userId)) return prev;
        return [...prev, data.userId];
      });
    });

    const gameResultHandler = tournamentSocket.on('game-result', (data: GameResultResponse) => {
      console.log('[tournament-socket-provider] Game result info:', data);
      setGameResult(data);
    });

    return () => {
      matchInfo();
      ready();
      gameResultHandler();
    };
  }, [
    tournamentSocket.socket,
    tournamentSocket.on,
    setMatchInfo,
    setReadyPlayerIds,
    setGameResult,
    me?.data,
    router,
  ]);

  return null;
};

export const TournamentSocketProvider = ({ children }: PropsWithChildren) => {
  const [matchInfo, setMatchInfo] = useState<MatchInfoType | null>(null);
  const [socket, setSocket] = useState<UseSocketReturn | null>(null);
  const [readyPlayerIds, setReadyPlayerIds] = useState<number[]>([]);
  const [gameResult, setGameResult] = useState<GameResultResponse | null>(null);

  const handleSetMatchInfo = useCallback((info: MatchInfoType | null) => {
    setMatchInfo(info);
  }, []);

  const handleSetSocket = useCallback((sock: UseSocketReturn) => {
    setSocket(sock);
  }, []);

  const handleSetReadyPlayerIds = useCallback((updater: (prev: number[]) => number[]) => {
    setReadyPlayerIds(updater);
  }, []);

  const handleSetGameResult = useCallback((result: GameResultResponse | null) => {
    setGameResult(result);
  }, []);

  const contextValue = useMemo(
    () => ({ matchInfo, socket, readyPlayerIds, gameResult }),
    [matchInfo, socket, readyPlayerIds, gameResult],
  );

  return (
    <TournamentContext.Provider value={contextValue}>
      <Suspense fallback={null}>
        <TournamentSocketProviderInner
          setMatchInfo={handleSetMatchInfo}
          setSocket={handleSetSocket}
          setReadyPlayerIds={handleSetReadyPlayerIds}
          setGameResult={handleSetGameResult}
        />
      </Suspense>
      {children}
    </TournamentContext.Provider>
  );
};

const TournamentSocketProviderInner = ({
  setMatchInfo,
  setSocket,
  setReadyPlayerIds,
  setGameResult,
}: MatchInfoSetter & SocketSetter & ReadyPlayerIdsSetter & GameResultSetter) => {
  const searchParams = useSearchParams();
  const tid = searchParams.get('tid');

  if (!(tid && tid.trim().length > 0)) return null;

  return (
    <TournamentSocketManager
      key={tid}
      tid={tid}
      setMatchInfo={setMatchInfo}
      setSocket={setSocket}
      setReadyPlayerIds={setReadyPlayerIds}
      setGameResult={setGameResult}
    />
  );
};
