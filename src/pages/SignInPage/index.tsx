import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const SignInPage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        toast('Google sign-in is not implemented yet');
        break;
      case 1:
        navigate(PATH.SIGNIN_EMAIL);
        break;
      case 2:
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding className={styles.branding} />

      <DefaultStepNavigator
        items={['CONTINUE WITH GOOGLE', 'CONTINUE WITH EMAIL', 'GO BACK']}
        onSelect={handleSelect}
      />

      <GameLicense className={styles.license} />
    </Flex>
  );
};

export { EmailSignInPage } from './EmailLoginPage';
