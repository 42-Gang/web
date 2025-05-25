import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const navigatorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        navigate(PATH.SIGNIN);
        break;
      case 1:
        navigate(PATH.SIGNUP);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    navigatorRef.current?.focus();
  }, []);

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding className={styles.branding} />
      <DefaultStepNavigator
        ref={navigatorRef}
        items={['SIGN IN', 'SIGN UP']}
        onSelect={handleSelect}
        style={{ outline: 'none' }}
      />
      <GameLicense className={styles.license} />
    </Flex>
  );
};
