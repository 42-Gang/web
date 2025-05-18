import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { BackButton, Branding, GameLicense } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

type Step = 'autoCustomSelect' | 'modeSelect';

export const GameSelectPage = () => {
  const [step, setStep] = useState<Step>('autoCustomSelect');
  const [option, setOption] = useState<'auto' | 'custom' | null>(null);
  const [mode, setMode] = useState<'1vs1' | 'tournament' | null>(null);

  const navigate = useNavigate();

  const handleOptionSelect = (selected: 'auto' | 'custom') => {
    setOption(selected);
    setStep('modeSelect');
  };

  const handleModeSelect = (selectedMode: '1vs1' | 'tournament') => {
    setMode(selectedMode);
    if (option) {
      const path = option === 'auto' ? PATH.GAME_AUTO_MATCHING : PATH.GAME_CUSTOM_MATCHING;

      navigate(`${path}?mode=${selectedMode}`);
    }
  };

  useEffect(() => {
    // TODO: mode + option 사용 예정
  }, [mode, option]);

  return (
    <Flex direction="column" alignItems="center" style={{ height: '100%' }}>
      <BackButton />
      <Branding className={styles.branding} />
      {step === 'autoCustomSelect' && (
        <div className={styles.buttonWrapper}>
          <button className={styles.autoCustomButton} onClick={() => handleOptionSelect('auto')}>
            AUTO
          </button>
          <button className={styles.autoCustomButton} onClick={() => handleOptionSelect('custom')}>
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
