'use client';

import { MenuSelector } from '~/components/ui';
import { routes } from '~/constants/routes';
import { env } from '~/constants/variables';

interface Props {
  provider?: 'GOOGLE';
  type: 'SIGNIN' | 'SIGNUP';
}

export const OAuthLoginButton = ({ provider = 'GOOGLE', type }: Props) => {
  const redirect = () => {
    const baseURI = env.api_base;
    const redirectURI = `${window.location.origin}/${routes.oauth_callback}`;
    window.location.href = `${baseURI}/api/v1/oauth/${provider}?redirectUri=${redirectURI}&state=${type}`;
  };

  return (
    <MenuSelector.Button onClick={() => redirect()}>
      {type === 'SIGNIN' ? 'SIGN IN' : 'SIGN UP'} WITH {provider}
    </MenuSelector.Button>
  );
};
