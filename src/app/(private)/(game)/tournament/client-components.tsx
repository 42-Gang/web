'use client';

import { useTournamentMatchInfo, useTournamentSocket } from '../tournament-socket-provider';

export const ClientComponents = () => {
  const matchInfo = useTournamentMatchInfo();
  const socket = useTournamentSocket();

  if (!matchInfo) return null;

  const { mode, size, players } = matchInfo;

  
  const handleEmit = () => {
    if (socket?.isConnected) {
      socket.emit('event-name', { data: 'example' });
    }
  };

  return (
    <div>
      <p>{mode}</p>
      <p>{size}</p>
      <p>{players.map(p => p.nickname).join(', ')}</p>
      
      {socket?.isConnected && (
        <button onClick={handleEmit} type="button">
          Emit Event
        </button>
      )}
    </div>
  );
};
