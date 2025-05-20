import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { BackButton, Branding, GameLicense, StepNavigator } from '@/components/ui';
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
        <StepNavigator
          items={['AUTO', 'CUSTOM']}
          initial={0}
          onSelect={(index) => handleOptionSelect(index === 0 ? 'auto' : 'custom')}
          renderItem={({
            text,
            isCurrent,
            onClick,
            onMouseEnter,
            onMouseLeave,
            onFocus,
            onBlur,
          }) => (
            <button
              className={styles.autoCustomButton}
              {...(isCurrent && { 'data-current': 'true' })}
              style={{ outline: isCurrent ? '2px solid white' : 'none' }}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              {text}
            </button>
          )}
          renderContainer={({ children, onFocus, onBlur }) => (
            <div className={styles.buttonWrapper} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
              {children}
            </div>
          )}
        />
      )}

      {step === 'modeSelect' && (
        <StepNavigator
          items={['1VS1', 'TOURNAMENT']}
          initial={0}
          onSelect={(index) => handleModeSelect(index === 0 ? '1vs1' : 'tournament')}
          renderItem={({
            text,
            isCurrent,
            onClick,
            onMouseEnter,
            onMouseLeave,
            onFocus,
            onBlur,
          }) => (
            <button
              className={text === '1VS1' ? styles.vsButton : styles.tournamentButton}
              {...(isCurrent && { 'data-current': 'true' })}
              style={{ outline: isCurrent ? '2px solid white' : 'none' }}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          )}
          renderContainer={({ children, onFocus, onBlur }) => (
            <div className={styles.modeWrapper} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
              {children}
            </div>
          )}
        />
      )}

      <GameLicense className={styles.license} />
    </Flex>
  );
};
