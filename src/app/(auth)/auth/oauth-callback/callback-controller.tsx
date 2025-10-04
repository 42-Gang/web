'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useOAuthLogin } from '~/api';
import { routes } from '~/constants/routes';
import { env } from '~/constants/variables';

interface Props {
  code: string;
  state: string;
}

export const CallbackController = ({ code, state }: Props) => {
  const router = useRouter();
  const key = `oauth:${code}:${state}`;

  const { mutateAsync } = useOAuthLogin();

  useEffect(() => {
    if (sessionStorage.getItem(key) === 'processing') {
      return;
    }

    if (!code || !state) {
      console.error('[auth/oauth-callback] Missing OAuth parameters:', { code, state });
      return;
    }

    const redirectUri = `${window.location.origin}/${routes.oauth_callback}`;

    (async () => {
      try {
        sessionStorage.setItem(key, 'processing');

        const { data } = await mutateAsync({ code, state, redirectUri });
        localStorage.setItem(env.access_token, data.accessToken);

        router.replace('/');
      } catch (error) {
        console.error('[auth/oauth-callback] OAuth callback error:', error);

        router.replace(state === 'SIGNUP' ? `/${routes.register}` : `/${routes.login}`);
      } finally {
        sessionStorage.removeItem(key);
      }
    })();
  }, [code, state, key, mutateAsync, router]);

  return <WaitingText />;
};

const WaitingText = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="font-medium text-[32px] text-white leading-snug">Waiting{'.'.repeat(dotCount)}</p>
  );
};
