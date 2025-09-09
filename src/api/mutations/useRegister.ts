import { useMutation } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';

type Request = {
  email: string;
  password: string;
  nickname: string;
  mailVerificationCode: string;
};

const postRegister = (payload: Request) => fetcher.post<HttpResponse>('v1/auth', { json: payload });

export const useRegister = () => useMutation({ mutationFn: postRegister });
