import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { HttpResponse, User } from '@/api/types';

type Request = {
  nickname: string;
};

const patchUpdateProfile = (payload: Request) =>
  fetcher.patch<HttpResponse<User>>('users/me', { json: payload });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ ...queryKeys.usersMe(), type: 'all' });
    },
  });
};
