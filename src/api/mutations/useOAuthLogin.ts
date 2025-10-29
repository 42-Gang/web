import { useMutation } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';

interface Request {
  code: string;
  state: string;
  redirectUri: string;
}

interface Response {
  accessToken: string;
}

const postOAuthLogin = (payload: Request) =>
  fetcher.post<HttpResponse<Response>>('v1/oauth/google/token', { json: payload });

export const useOAuthLogin = () => useMutation({ mutationFn: postOAuthLogin });
