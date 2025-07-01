import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

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

        const redirectUri = `${window.location.origin}${PATH.SIGNUP_GOOGLE_CALLBACK}`;
        const googleSignUpUrl = `${baseUrl}/v1/oauth/google?redirectUri=${redirectUri}`;
        window.location.href = googleSignUpUrl;
        break;
      }
      case 1:
        navigate(PATH.SIGNUP_EMAIL);
        break;
      case 2:
        navigate(-1);
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
