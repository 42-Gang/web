import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';

const postLogout = async (): Promise<void> => {
  await fetcher.post<void>('auth/logout');
};

export const useLogout = () => useMutation({ mutationFn: postLogout });
