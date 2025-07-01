import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';
import { redirectToGoogleOAuth } from '@/utils/auth/redirectToGoogleOAuth';

import * as styles from './styles.css';

export const SignInPage = () => {
  const navigate = useNavigate();
  const navigatorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    switch (index) {
      case 0: {
        const baseUrl = import.meta.env.VITE_API_URL;

        if (!baseUrl) {
          toast.error('Google login is currently unavailable. Please contact the administrator.');
          break;
        }

        redirectToGoogleOAuth({ type: 'signin', baseUrl });
        break;
      }

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

  useEffect(() => {
    navigatorRef.current?.focus();
  }, []);

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding className={styles.branding} />

      <DefaultStepNavigator
        ref={navigatorRef}
        items={['SIGN IN WITH GOOGLE', 'SIGN IN WITH EMAIL', 'GO BACK']}
        onSelect={handleSelect}
        style={{ outline: 'none' }}
      />

      <GameLicense className={styles.license} />
    </Flex>
  );
};

export { EmailSignInPage } from './EmailSignInPage';
