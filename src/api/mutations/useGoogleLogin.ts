import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { HttpResponse } from '@/api/types';

type Request = {
  code: string;
  state: string;
  redirectUri: string;
};

type Response = {
  accessToken: string;
};

const postGoogleLogin = (payload: Request) =>
  fetcher.post<HttpResponse<Response>>('v1/oauth/google/token', {
    json: payload,
  });

export const useGoogleLogin = () => useMutation({ mutationFn: postGoogleLogin });
