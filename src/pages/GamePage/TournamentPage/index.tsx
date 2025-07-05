import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MatchInfoType, Match, ReadyResponse, GameResultResponse } from '@/api';
import { useSocket } from '@/api/socket';
import { BackButton } from '@/components/ui';

import { MatchNode } from './components/MatchNode';
import { TOURNAMENT_SIZES, TOURNAMENT_LABELS, DEFAULT_PLAYER_STATS } from './constants';
import * as styles from './styles.css';

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

const updateMatchWinner = (match: Match, matchId: string, winnerId: string): Match => {
  if (match.id === matchId) {
    return { ...match, winnerId };
  }

  if (match.children && match.children.length === 2) {
    return {
      ...match,
      children: [
        updateMatchWinner(match.children[0], matchId, winnerId),
        updateMatchWinner(match.children[1], matchId, winnerId),
      ],
    };
  }

  return match;
};

const buildFinalMatch = (leftSemiFinal: Match, rightSemiFinal: Match): Match => {
  const leftWinner = leftSemiFinal.winnerId
    ? leftSemiFinal.player1?.id === leftSemiFinal.winnerId
      ? leftSemiFinal.player1
      : leftSemiFinal.player2
    : undefined;

  const rightWinner = rightSemiFinal.winnerId
    ? rightSemiFinal.player1?.id === rightSemiFinal.winnerId
      ? rightSemiFinal.player1
      : rightSemiFinal.player2
    : undefined;

  return {
    id: 'final',
    player1: leftWinner,
    player2: rightWinner,
    winnerId: undefined,
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
  const [searchParams] = useSearchParams();
  const [tournamentData, setTournamentData] = useState<MatchInfoType | null>(null);
  const [readyPlayerIds, setReadyPlayerIds] = useState<number[]>([]);
  const [tournamentMatch, setTournamentMatch] = useState<Match | null>(null);

  const tournamentId = searchParams.get('id');

  const { socket, connect, disconnect } = useSocket({
    path: `tournament?tournamentId=${tournamentId}`,
    handshake: '/ws/main-game',
    withToken: true,
  });

  const handleTournamentDataUpdate = useCallback((data: MatchInfoType) => {
    setTournamentData(data);
  }, []);

  const handlePlayerReady = useCallback((data: ReadyResponse) => {
    setReadyPlayerIds((prev) => {
      if (prev.includes(data.userId)) return prev;
      return [...prev, data.userId];
    });
  }, []);

  const handleMatchResult = useCallback((data: GameResultResponse) => {
    setTournamentMatch((prevMatch) => {
      if (!prevMatch) return prevMatch;

      const updatedMatch = updateMatchWinner(
        prevMatch,
        data.matchId.toString(),
        data.winnerId.toString(),
      );

      if (updatedMatch.children && updatedMatch.children.length === 2) {
        const [leftSemiFinal, rightSemiFinal] = updatedMatch.children;

        if (leftSemiFinal.winnerId && rightSemiFinal.winnerId) {
          const finalMatch = buildFinalMatch(leftSemiFinal, rightSemiFinal);
          return {
            ...updatedMatch,
            player1: finalMatch.player1,
            player2: finalMatch.player2,
            winnerId: finalMatch.winnerId,
          };
        }
      }

      return updatedMatch;
    });
  }, []);

  useEffect(() => {
    if (!tournamentId) {
      console.error('Tournament ID is required');
      return;
    }
    connect();
    return () => disconnect();
  }, [connect, disconnect, tournamentId]);

  useEffect(() => {
    if (!socket) return;

    socket.on('match-info', handleTournamentDataUpdate);
    socket.on('ready', handlePlayerReady);
    socket.on('game-result', handleMatchResult);

    return () => {
      socket.off('match-info', handleTournamentDataUpdate);
      socket.off('ready', handlePlayerReady);
      socket.off('game-result', handleMatchResult);
    };
  }, [socket, handleTournamentDataUpdate, handlePlayerReady, handleMatchResult]);

  useEffect(() => {
    if (tournamentData) {
      const initialMatch = buildTournamentMatch(
        tournamentData.players,
        tournamentData.size as TournamentSize,
      );
      setTournamentMatch(initialMatch);

      const readyPlayerIds = tournamentData.players
        .filter((player) => player.state === 'READY')
        .map((player) => player.userId);
      setReadyPlayerIds(readyPlayerIds);
    }
  }, [tournamentData]);

  const isDuelMode = tournamentData?.size === TOURNAMENT_SIZES.DUEL;

  const handleReady = useCallback(() => {
    if (!tournamentId) return;
    socket?.emit('ready', {});
  }, [tournamentId, socket]);

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

        {tournamentMatch && tournamentData && (
          <div className={styles.tournamentContainer}>
            <MatchNode
              match={tournamentMatch}
              isRoot={true}
              readyIds={readyPlayerIds}
              currentUserId=""
              showLine={true}
              isTwoPlayer={isDuelMode}
              tournamentSize={tournamentData.size}
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
