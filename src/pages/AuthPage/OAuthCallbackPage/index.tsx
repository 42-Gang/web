import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useGoogleLogin } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { Branding, GameLicense } from '@/components/ui';
import { PATH } from '@/constants';

import * as styles from './styles.css';

export const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const navigate = useNavigate();

  const { setToken } = useAuthAtom();
  const { mutateAsync } = useGoogleLogin();

  useEffect(() => {
    if (!code || !state) {
      toast.error('Missing code or state in URL');
      navigate(PATH.AUTH_SIGNIN);
      return;
    }

    const redirectUri = `${window.location.origin}${PATH.AUTH_OAUTH_CALLBACK}`;

    const handleCallback = async () => {
      try {
        const { data } = await mutateAsync({ code, state, redirectUri });
        setToken(data.accessToken);
        navigate('/', { replace: true });
      } catch (error) {
        console.error(error);
        toast.error('Google login failed');
        navigate(state === 'signup' ? PATH.AUTH_SIGNUP : PATH.AUTH_SIGNIN);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Branding className={styles.branding} />
      <p className={styles.loadingText}>Waiting...</p>
      <GameLicense className={styles.license} />
    </div>
  );
};
