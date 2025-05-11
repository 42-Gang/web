import { useUsersMe } from '@/api';

import { TournamentSummary } from './tournament-summary';

export const TournamentStats = () => {
  const { data } = useUsersMe();

  const tournament = data?.data?.tournament ?? null;

  return <TournamentSummary tournament={tournament} />;
};
