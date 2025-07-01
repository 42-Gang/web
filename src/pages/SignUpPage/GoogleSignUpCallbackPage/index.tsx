import { PATH } from '@/constants';
import { GoogleCallbackHandler } from '@/pages/OAuthPage/GoogleCallbackHandler';

export const GoogleSignUpCallbackPage = () => {
  return (
    <GoogleCallbackHandler
      redirectPath={PATH.SIGNUP}
      redirectUriPath={PATH.SIGNUP_GOOGLE_CALLBACK}
    />
  );
};
