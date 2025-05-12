import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const LandingPage = () => {
  const navigate = useNavigate();

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

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding className={styles.branding} />
      <DefaultStepNavigator items={['SIGN IN', 'SIGN UP']} onSelect={handleSelect} />
      <GameLicense className={styles.license} />
    </Flex>
  );
};
