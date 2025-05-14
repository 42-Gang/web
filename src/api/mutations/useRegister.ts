import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { HttpResponse } from '@/api/types';

type Request = {
  email: string;
  password: string;
  nickname: string;
  mailVerificationCode: string;
};

const postRegister = (payload: Request) => fetcher.post<HttpResponse>('auth', { json: payload });

export const useRegister = () => useMutation({ mutationFn: postRegister });
