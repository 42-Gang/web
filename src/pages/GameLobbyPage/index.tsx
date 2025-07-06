import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { BackButton, Branding, GameLicense, GameLobbyStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const GameLobbyPage = () => {
  const [step, setStep] = useState<'AUTO-CUSTOM' | 'MODE'>('AUTO-CUSTOM');
  const [path, setPath] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAutoConfirm = (index: number) => {
    const selectedPath =
      index === 0 ? PATH.GAME_LOBBY_AUTO_MATCHING : PATH.GAME_LOBBY_CUSTOM_MATCHING;
    setPath(selectedPath);
    setStep('MODE');
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

      {step === 'AUTO-CUSTOM' && (
        <GameLobbyStepNavigator
          items={['AUTO', 'CUSTOM']}
          onConfirm={handleAutoConfirm}
          wrapperClassName={styles.buttonWrapper}
          buttonClassName={() => styles.autoCustomButton}
        />
      )}

      {step === 'MODE' && (
        <div className={styles.modeWrapper}>
          <button
            className={styles.vsButton}
            onClick={() => handleModeConfirm(0)}
            aria-label="1대1 게임 모드 선택"
          >
            <img src={styles.imagePath.ONE_VS_ONE} className={styles.buttonImage} alt="" />
            <span className={styles.buttonText}>1vs1</span>
          </button>

          <button
            className={styles.tournamentButton}
            onClick={() => handleModeConfirm(1)}
            aria-label="토너먼트 게임 모드 선택"
          >
            <img src={styles.imagePath.TOURNAMENT} className={styles.buttonImage} alt="" />
            <span className={styles.buttonText}>Tournament</span>
          </button>
        </div>
      )}

      <GameLicense className={styles.license} />
    </Flex>
  );
};
