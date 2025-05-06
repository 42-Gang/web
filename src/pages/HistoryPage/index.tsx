import { useState } from 'react';

import { GoHomePage } from './components/go-home-page';
import { SectionTitle } from './components/section-title';
import { ViewToggle } from './components/view-toggle';
import { ToggleButtonGroup } from './components/view-toggle/ToggleButtonGroup';

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
      <ToggleButtonGroup>
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
      </ToggleButtonGroup>
    </>
  );
};
