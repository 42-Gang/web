import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { MatchInfoType, Match, ReadyResponse } from '@/api';
import { useSocket } from '@/api/socket';
import { BackButton } from '@/components/ui';

import { MatchNode } from './components/MatchNode';
import * as styles from './styles.css';

const TOURNAMENT_SIZES = {
  DUEL: 2,
  QUAD: 4,
} as const;

const TOURNAMENT_LABELS = {
  [TOURNAMENT_SIZES.DUEL]: '1vs1',
  [TOURNAMENT_SIZES.QUAD]: '4인 토너먼트',
} as const;

const DEFAULT_PLAYER_STATS = {
  win: 0,
  lose: 0,
  tournament: 0,
} as const;

type TournamentSize = (typeof TOURNAMENT_SIZES)[keyof typeof TOURNAMENT_SIZES];

const createPlayerFromMatchInfo = (playerInfo: MatchInfoType['players'][0]) => {
  if (!playerInfo) return undefined;

  return {
    id: playerInfo.userId.toString(),
    name: playerInfo.nickname,
    avatarUrl: playerInfo.profileImage,
    ...DEFAULT_PLAYER_STATS,
  };
};

const buildTournamentMatch = (players: MatchInfoType['players'], size: TournamentSize): Match => {
  switch (size) {
    case TOURNAMENT_SIZES.QUAD: {
      const [player1, player2, player3, player4] = players;

      return {
        id: 'root',
        children: [
          {
            id: 'semi1',
            player1: createPlayerFromMatchInfo(player1),
            player2: createPlayerFromMatchInfo(player2),
            winnerId: undefined,
          },
          {
            id: 'semi2',
            player1: createPlayerFromMatchInfo(player3),
            player2: createPlayerFromMatchInfo(player4),
            winnerId: undefined,
          },
        ],
      };
    }

    case TOURNAMENT_SIZES.DUEL: {
      const [player1, player2] = players;

      return {
        id: 'root',
        player1: createPlayerFromMatchInfo(player1),
        player2: createPlayerFromMatchInfo(player2),
        winnerId: undefined,
      };
    }

    default:
      return {
        id: 'root',
        player1: undefined,
        player2: undefined,
        winnerId: undefined,
      };
  }
};

const getTournamentLabel = (size: number): string => {
  return TOURNAMENT_LABELS[size as TournamentSize] || '';
};

export const TournamentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tournamentData, setTournamentData] = useState<MatchInfoType | null>(null);
  const [readyPlayerIds, setReadyPlayerIds] = useState<number[]>([]);

  const tournamentId = searchParams.get('id');

  const { socket, connect, disconnect } = useSocket({
    path: `tournament?tournamentId=${tournamentId}`,
    handshake: '/ws/main-game',
    withToken: true,
  });

  useEffect(() => {
    if (!tournamentId) {
      console.error('Tournament ID is required');
      return;
    }
    connect();
    return () => disconnect();
  }, [connect, disconnect, tournamentId, navigate]);

  useEffect(() => {
    const handleTournamentDataUpdate = (data: MatchInfoType) => {
      setTournamentData(data);

      const readyUserIds = data.players
        .filter((player) => player.state === 'READY')
        .map((player) => player.userId);

      setReadyPlayerIds(readyUserIds);
    };

    const handlePlayerReady = (data: ReadyResponse) => {
      setReadyPlayerIds((prev) => [...prev, data.userId]);
    };

    socket.on('match-info', handleTournamentDataUpdate);
    socket.on('ready', handlePlayerReady);

    return () => {
      socket.off('match-info', handleTournamentDataUpdate);
      socket.off('ready', handlePlayerReady);
    };
  }, [socket]);

  const tournamentMatch = tournamentData
    ? buildTournamentMatch(tournamentData.players, tournamentData.size as TournamentSize)
    : null;
  const isDuelMode = tournamentData?.size === TOURNAMENT_SIZES.DUEL;

  const handleReady = () => {
    if (!tournamentId) return;
    socket.emit('ready', {});
  };

  return (
    <>
      <BackButton />

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Tournament</h1>
          <h2 className={styles.round}>
            {tournamentData ? getTournamentLabel(tournamentData.size) : ''}
          </h2>
        </header>

        {tournamentMatch && (
          <div className={styles.tournamentContainer}>
            <MatchNode
              match={tournamentMatch}
              isRoot={true}
              readyIds={readyPlayerIds}
              currentUserId=""
              showLine={true}
              isTwoPlayer={isDuelMode}
            />
          </div>
        )}

        <div className={styles.buttonWrapper}>
          <button className={styles.readyButton} onClick={handleReady} aria-label="Ready" />
        </div>
      </div>
    </>
  );
};
