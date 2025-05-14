import { useState, useEffect } from 'react';

import { Flex } from '@/components/system';
import { BackButton, Branding, GameLicense } from '@/components/ui';

import * as styles from './styles.css';

type Step = 'autoCustom' | 'modeSelect';

export const GameSelectPage = () => {
  const [step, setStep] = useState<Step>('autoCustom');
  const [mode, setMode] = useState<'1vs1' | 'tournament' | null>(null);
  const [setting, setSetting] = useState<'auto' | 'custom' | null>(null);

  const handleSettingSelect = (selected: 'auto' | 'custom') => {
    setSetting(selected);
    setStep('modeSelect');
  };

  const handleModeSelect = (selectedMode: '1vs1' | 'tournament') => {
    setMode(selectedMode);
  };

  useEffect(() => {
    // TODO: mode + setting 사용 예정
  }, [mode, setting]);

  return (
    <Flex direction="column" alignItems="center" style={{ height: '100%' }}>
      <BackButton />
      <Branding className={styles.branding} />
      {step === 'autoCustom' && (
        <div className={styles.buttonWrapper}>
          <button className={styles.autoCustomButton} onClick={() => handleSettingSelect('auto')}>
            AUTO
          </button>
          <button className={styles.autoCustomButton} onClick={() => handleSettingSelect('custom')}>
            CUSTOM
          </button>
        </div>
      )}

      {step === 'modeSelect' && (
        <div className={styles.modeWrapper}>
          <button className={styles.vsButton} onClick={() => handleModeSelect('1vs1')} />
          <button
            className={styles.tournamentButton}
            onClick={() => handleModeSelect('tournament')}
          />
        </div>
      )}
      <GameLicense className={styles.license} />
    </Flex>
  );
};
