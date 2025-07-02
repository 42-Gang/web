import { PATH } from '@/constants';

type Params = {
  type: 'signin' | 'signup';
  baseUrl: string;
};

export const redirectToOAuth = ({ type, baseUrl }: Params) => {
  const redirectUri = `${window.location.origin}${PATH.OAUTH_GOOGLE_CALLBACK}`;
  const googleUrl = `${baseUrl}/v1/oauth/google?redirectUri=${redirectUri}&state=${type}`;
  window.location.href = googleUrl;
};
