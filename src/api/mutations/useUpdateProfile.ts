import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpResponse, User } from '~/api';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

type Request = {
  nickname: string;
};

const patchUpdateProfile = (payload: Request) =>
  fetcher.patch<HttpResponse<User>>('v1/users/me', { json: payload });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' });
    },
  });
};
