import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useGoogleLogin } from '@/api/mutations/useGoogleLogin';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { Branding, GameLicense } from '@/components/ui';

import * as styles from '../SignInPage/GoogleCallbackPage/styles.css';


type Props = {
  redirectPath: string;
  redirectUriPath: string;
};

export const GoogleCallbackHandler = ({ redirectPath, redirectUriPath }: Props) => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const navigate = useNavigate();

  const { setToken } = useAuthAtom();

  const { mutateAsync } = useGoogleLogin();

  useEffect(() => {
    if (!code || !state) {
      toast.error('Missing code or state in URL');
      navigate(redirectPath);
      return;
    }

    const redirectUri = `${window.location.origin}${redirectUriPath}`;

    const handleCallback = async () => {
      try {
        const { data } = await mutateAsync({ code, state, redirectUri });
        setToken(data.accessToken);
        navigate('/', { replace: true });
      } catch {
        toast.error('Google login failed');
        navigate(redirectPath);
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
