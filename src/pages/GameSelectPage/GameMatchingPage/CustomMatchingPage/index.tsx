import { useSearchParams } from 'react-router-dom';

import { Custom1vs1 } from './Custom1vs1';
import { CustomTournament } from './CustomTournament';

export const CustomMatchingPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  if (!mode) return;

  return (
    <div>
      {mode === '1vs1' && <Custom1vs1 />}
      {mode === 'tournament' && <CustomTournament />}
    </div>
  );
};
