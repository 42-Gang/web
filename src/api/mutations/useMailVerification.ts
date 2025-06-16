import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { HttpResponse } from '@/api/types';

type Request = {
  email: string;
};

const postMailVerification = (payload: Request) =>
  fetcher.post<HttpResponse>('v1/auth/mail', {
    json: payload,
  });

export const useMailVerification = () => useMutation({ mutationFn: postMailVerification });
