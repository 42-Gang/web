import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const HomePage = () => {
  const navigate = useNavigate();
  const navigatorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    const paths = [PATH.GAME_LOBBY, PATH.HISTORY, PATH.FRIEND, PATH.PROFILE];
    if (index >= 0 && index < paths.length) {
      navigate(paths[index]);
    }
  };

  useEffect(() => {
    navigatorRef.current?.focus();
  }, []);

  return (
    <>
      <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
        <img src="/assets/images/gun.svg" alt="gunImage" className={styles.gun({ side: 'left' })} />
        <Branding className={styles.branding} />
        <img
          src="/assets/images/gun.svg"
          alt="gunImage"
          className={styles.gun({ side: 'right' })}
        />

        <DefaultStepNavigator
          ref={navigatorRef}
          items={['START GAME', 'HISTORY', 'FRIEND', 'PROFILE']}
          onSelect={handleSelect}
          style={{ outline: 'none' }}
        />
        <GameLicense className={styles.license} />
      </Flex>
    </>
  );
};
