import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    const paths = [PATH.GAME_SELECT, PATH.HISTORY, PATH.FRIEND, PATH.PROFILE];
    if (index >= 0 && index < paths.length) {
      navigate(paths[index]);
    }
  };

  return (
    <>
      <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
        <Branding className={styles.branding} />
        <DefaultStepNavigator
          items={['START GAME', 'HISTORY', 'FRIEND', 'PROFILE']}
          onSelect={handleSelect}
        />
        <GameLicense className={styles.license} />
      </Flex>
    </>
  );
};
