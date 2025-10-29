import { useMutation } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';

interface Request {
  email: string;
  password: string;
}

interface Response {
  accessToken: string;
}

const postLogin = (payload: Request) =>
  fetcher.post<HttpResponse<Response>>('v1/auth/login', { json: payload });

export const useLogin = () => useMutation({ mutationFn: postLogin });
