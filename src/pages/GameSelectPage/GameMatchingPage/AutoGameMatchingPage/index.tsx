import { useSearchParams } from 'react-router-dom';

import { Game1vs1MatchingPage } from './Auto1vs1';
import { GameTournamentMatchingPage } from './AutoTournament';

export const GameAutoMatchingPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  if (!mode) return;

  return (
    <div>
      {mode === '1vs1' && <Game1vs1MatchingPage />}
      {mode === 'tournament' && <GameTournamentMatchingPage />}
    </div>
  );
};
