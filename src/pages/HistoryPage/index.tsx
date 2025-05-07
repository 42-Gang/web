import { useState } from 'react';

import { Flex } from '@/components/system';

import { GoHomePage } from './components/go-home-page';
import { OneVsOneStats } from './components/one-vs-one-stats';
import { SectionTitle } from './components/section-title';
import { ViewToggle } from './components/view-toggle';

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
    <>
      <GoHomePage />
      <SectionTitle />
      <Flex justifyContent="center" gap="1rem">
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
        {/* {selected === 'TOURNAMENT'} */}
      </Flex>
    </>
  );
};
