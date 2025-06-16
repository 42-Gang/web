import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useGoogleLogin } from '@/api/mutations/useGoogleLogin';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { Branding, GameLicense } from '@/components/ui';
import { PATH } from '@/constants/routes';

import * as styles from './styles.css';

export const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const navigate = useNavigate();

  const hasRunRef = useRef(false);
  const { setToken } = useAuthAtom();
  const { mutateAsync } = useGoogleLogin();

  useEffect(() => {
    if (!code || !state) {
      toast.error('Missing code or state in URL');
      navigate(PATH.SIGNIN);
      return;
    }

    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const redirectUri = `${window.location.origin}${PATH.SIGNIN_GOOGLE_CALLBACK}`;
    const handleCallback = async () => {
      try {
        const { data } = await mutateAsync({ code, state, redirectUri });
        setToken(data.accessToken);

        setTimeout(() => {
          window.location.replace(PATH.HOME);
        }, 1800);
      } catch {
        toast.error('Google login failed');
        navigate(PATH.SIGNIN);
      }
    };

    handleCallback();
  }, [code, state, mutateAsync, navigate, setToken]);

  return (
    <div className={styles.container}>
      <Branding className={styles.branding} />
      <p className={styles.loadingText}>Waiting...</p>
      <GameLicense className={styles.license} />
    </div>
  );
};
