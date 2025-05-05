import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { HttpResponse } from '@/api/types';

type Request = {
  email: string;
};

const postMailVerification = (body: Request) =>
  fetcher.post<HttpResponse>('auth/mail', { json: body });

export const useMailVerification = () => useMutation({ mutationFn: postMailVerification });
