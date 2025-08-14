import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useSocket } from '@/api/socket';

export const GamePage = () => {
  const [searchParams] = useSearchParams();

  const serverName = searchParams.get('serverName');
  const tournamentId = searchParams.get('tournamentId');
  const matchId = searchParams.get('matchId');
  const playerType = searchParams.get('playerType');

  const { connect, disconnect } = useSocket({
    path: `?matchId=${matchId}&server=${serverName}`,
    handshake: '/ws/match-game',
    withToken: true,
  });

  useEffect(() => {
    if (!matchId || !serverName) {
      console.error('Missing matchId or serverName');
      return;
    }
    connect();
    return () => disconnect();
  }, [connect, disconnect, matchId, serverName]);

  if (!serverName || !tournamentId || !matchId || !playerType) {
    return <div>Error: Missing required parameters.</div>;
  }

  return (
    <div>
      <h1>Game Page</h1>
      <p>Server Name: {serverName}</p>
      <p>Tournament ID: {tournamentId}</p>
      <p>Match ID: {matchId}</p>
      <p>Player Type: {playerType}</p>
    </div>
  );
};
