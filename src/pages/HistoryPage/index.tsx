import { useState } from 'react';

import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';
import { rem } from '@/styles';

import { OneVsOneStats } from './components/one-vs-one-stats';
import { TournamentStats } from './components/tournament-stats';
import { ViewToggle } from './components/view-toggle';
import * as styles from './styles.css';

export const HistoryPage = () => {
  const [selected, setSelected] = useState<'1VS1' | 'TOURNAMENT' | null>(null);

  const handleToggle = (mode: '1VS1' | 'TOURNAMENT') => {
    if (selected === mode) {
      setSelected(null);
    } else {
      setSelected(mode);
    }
  };

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />

      <h2 className={styles.title}>Select game type</h2>

      <Flex justifyContent="center" style={{ gap: rem(48) }}>
        <ViewToggle
          label="1 VS 1"
          onClick={() => handleToggle('1VS1')}
          isSelected={selected === '1VS1'}
        />
        <ViewToggle
          label={'TOURNAMENT'}
          onClick={() => handleToggle('TOURNAMENT')}
          isSelected={selected === 'TOURNAMENT'}
        />
      </Flex>

      <Flex justifyContent="center">
        {selected === '1VS1' && <OneVsOneStats />}
        {selected === 'TOURNAMENT' && <TournamentStats />}
      </Flex>
    </Flex>
  );
};
