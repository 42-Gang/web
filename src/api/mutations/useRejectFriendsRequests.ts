import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

type Request = {
  id: number;
};

const patchRejectFriendsRequests = (payload: Request) =>
  fetcher.patch<HttpResponse>(`v1/friends/requests/${payload.id}/reject`, { json: {} });

export const useRejectFriendsRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRejectFriendsRequests,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' });
    },
  });
};
