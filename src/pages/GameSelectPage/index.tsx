import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { BackButton, Branding, GameLicense, GameSelectStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css.ts';

export const GameSelectPage = () => {
  const [step, setStep] = useState<'auto-custom-select' | 'mode-select'>('auto-custom-select');
  const [path, setPath] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAutoConfirm = (index: number) => {
    const selectedPath = index === 0 ? PATH.GAME_AUTO_MATCHING : PATH.GAME_CUSTOM_MATCHING;
    setPath(selectedPath);
    setStep('mode-select');
  };

  const handleModeConfirm = (index: number) => {
    if (!path) return;

    const mode = index === 0 ? '1vs1' : 'tournament';
    const tournamentSize = mode === '1vs1' ? 2 : 4;

    navigate(`${path}?mode=${mode}&size=${tournamentSize}`);
  };

  return (
    <Flex direction="column" alignItems="center" style={{ height: '100%' }}>
      <BackButton />
      <Branding className={styles.branding} />

      {step === 'auto-custom-select' && (
        <GameSelectStepNavigator
          items={['AUTO', 'CUSTOM']}
          onConfirm={handleAutoConfirm}
          wrapperClassName={styles.buttonWrapper}
          buttonClassName={() => styles.autoCustomButton}
        />
      )}

      {step === 'mode-select' && (
        <GameSelectStepNavigator
          items={['1VS1', 'TOURNAMENT']}
          onConfirm={handleModeConfirm}
          showText={false}
          buttonClassName={(text) => (text === '1VS1' ? styles.vsButton : styles.tournamentButton)}
          wrapperClassName={styles.modeWrapper}
        />
      )}

      <GameLicense className={styles.license} />
    </Flex>
  );
};
