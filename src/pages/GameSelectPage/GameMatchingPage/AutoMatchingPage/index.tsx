import { useSearchParams } from 'react-router-dom';

import { Auto1vs1 } from './Auto1vs1';
import { AutoTournament } from './AutoTournament';

export const GameAutoMatchingPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  if (!mode) return;

  return (
    <div>
      {mode === '1vs1' && <Auto1vs1 />}
      {mode === 'tournament' && <AutoTournament />}
    </div>
  );
};
