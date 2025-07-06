import { PATH } from '@/constants';

type Params = {
  provider?: 'GOOGLE';
  type: 'SIGNIN' | 'SIGNUP';
  baseUrl: string;
};

export const redirectOAuth = ({ provider = 'GOOGLE', type, baseUrl }: Params) => {
  if (provider !== 'GOOGLE') return;

  const redirectUri = `${window.location.origin}${PATH.AUTH_OAUTH_CALLBACK}`;
  window.location.href = `${baseUrl}/v1/oauth/google?redirectUri=${redirectUri}&state=${type}`;
};
