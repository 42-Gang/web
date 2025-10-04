import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

const deleteAvatar = () => fetcher.delete('v1/users/avatar', { json: {} });

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' });
    },
  });
};
