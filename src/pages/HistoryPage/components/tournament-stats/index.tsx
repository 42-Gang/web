import { useUserInformation } from '@/api';

import { TournamentSummary } from './tournament-summary';

export const TournamentStats = () => {
  const { data } = useUserInformation();

  const tournament = data?.data?.tournament ?? null;

  return <TournamentSummary tournament={tournament} />;
};
