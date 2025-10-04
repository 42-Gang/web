import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

const postUploadAvatar = (data: FormData) =>
  fetcher.post('v1/users/avatar', { body: data, headers: undefined });

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUploadAvatar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' });
    },
  });
};
