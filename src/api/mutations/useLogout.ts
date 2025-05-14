import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';

const postLogout = async (): Promise<void> => {
  await fetcher.post<void>('auth/logout', { json: {} });
};

export const useLogout = () => useMutation({ mutationFn: postLogout });
