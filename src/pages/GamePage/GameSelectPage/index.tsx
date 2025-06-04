import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { BackButton, Branding, GameLicense } from '@/components/ui';
import { GameSelectStepNavigator } from '@/components/ui/step-navigator/variants/game-step-navigator';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const GameSelectPage = () => {
  const [step, setStep] = useState<'autoCustomSelect' | 'modeSelect'>('autoCustomSelect');
  const [path, setPath] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAutoConfirm = (index: number) => {
    const selectedPath = index === 0 ? PATH.GAME_AUTO_MATCHING : PATH.GAME_CUSTOM_MATCHING;
    setPath(selectedPath);
    setStep('modeSelect');
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

      {step === 'autoCustomSelect' && (
        <GameSelectStepNavigator
          items={['AUTO', 'CUSTOM']}
          onConfirm={handleAutoConfirm}
          getClassName={() => styles.autoCustomButton}
          wrapperClassName={styles.buttonWrapper}
        />
      )}

      {step === 'modeSelect' && (
        <GameSelectStepNavigator
          items={['1VS1', 'TOURNAMENT']}
          onConfirm={handleModeConfirm}
          getClassName={(text) => (text === '1VS1' ? styles.vsButton : styles.tournamentButton)}
          wrapperClassName={styles.modeWrapper}
          showText={false}
        />
      )}

      <GameLicense className={styles.license} />
    </Flex>
  );
};
