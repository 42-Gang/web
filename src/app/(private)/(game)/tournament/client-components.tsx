'use client';

import { useTournamentMatchInfo } from '../tournament-socket-provider';

export const ClientComponents = () => {
  const matchInfo = useTournamentMatchInfo();

  if (!matchInfo) return null;

  const { mode, size, players } = matchInfo;

  return (
    <>
      <p>{mode}</p>
      <p>{size}</p>
      <p>{players.map(p => p.nickname).join(', ')}</p>
    </>
  );
};
