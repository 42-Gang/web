import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';

type Request = {
  admin_name: string;
  admin_password: string;
};

const postLogin = (body: Request) => fetcher.post<void>('/auth/login', { json: body });

export const useLogin = () => useMutation({ mutationFn: postLogin });
