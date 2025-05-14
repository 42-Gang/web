import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { HttpResponse, User } from '@/api/types';

type Request = {
  nickname: string;
};

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (body: Request) => fetcher.patch<HttpResponse<User>>('users/me', { json: body }),
  });
