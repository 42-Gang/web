import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

import { redirectOAuth } from '../utils';
import * as styles from './EmailSignUpPage/styles.css';

export const SignUpPage = () => {
  const navigatorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0: {
        const baseUrl = import.meta.env.VITE_API_URL;

        if (!baseUrl) {
          toast.error('Google sign-up is currently unavailable. Please contact the administrator.');
          break;
        }
        redirectOAuth({ provider: 'GOOGLE', type: 'SIGNUP', baseUrl });
        break;
      }

      case 1:
        navigate(PATH.AUTH_SIGNUP_EMAIL);
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
        items={['SIGN UP WITH GOOGLE', 'SIGN UP WITH EMAIL', 'GO BACK']}
        onSelect={handleSelect}
        style={{ outline: 'none' }}
      />

      <GameLicense className={styles.license} />
    </Flex>
  );
};
