import { useMutation } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';

interface Request {
  email: string;
}

const postMailVerification = (payload: Request) =>
  fetcher.post<HttpResponse>('v1/auth/mail', { json: payload });

export const useMailVerification = () => useMutation({ mutationFn: postMailVerification });
