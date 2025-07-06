import { PATH } from '@/constants';

type OAuthProvider = 'GOOGLE';

type Params = {
  provider?: OAuthProvider;
  type: 'SIGNIN' | 'SIGNUP';
  baseUrl: string;
};

export const redirectOAuth = ({ provider = 'GOOGLE', type, baseUrl }: Params) => {
  if (provider !== 'GOOGLE') return;

  const redirectUri = `${window.location.origin}${PATH.AUTH_OAUTH_CALLBACK}`;
  const providerPath = provider.toLowerCase();
  window.location.href = `${baseUrl}/v1/oauth/${providerPath}?redirectUri=${redirectUri}&state=${type}`;
};
