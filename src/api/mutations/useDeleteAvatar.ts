import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { queryKeys } from '@/api/queryKey';

const deleteAvatar = () => fetcher.delete('v1/users/avatar', { json: {} });

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ ...queryKeys.usersMe(), refetchType: 'all' });
    },
  });
};
