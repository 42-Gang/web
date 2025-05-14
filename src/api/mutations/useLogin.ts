import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { HttpResponse } from '@/api/types';

type Request = {
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
};

const postLogin = (payload: Request) =>
  fetcher.post<HttpResponse<Response>>('auth/login', { json: payload });

export const useLogin = () => useMutation({ mutationFn: postLogin });
