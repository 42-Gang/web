'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { WaitingText } from '~/components/ui';
import { routes } from '~/constants/routes';
import { env } from '~/constants/variables';
import { useOAuthLogin } from './useOAuthLogin';

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

        window.location.replace('/');
      } catch (error) {
        console.error('[auth/oauth-callback] OAuth callback failed:', error);

        router.replace(state === 'SIGNUP' ? `/${routes.register}` : `/${routes.login}`);
      } finally {
        sessionStorage.removeItem(key);
      }
    })();
  }, [code, state, key, mutateAsync, router]);

  return <WaitingText />;
};
