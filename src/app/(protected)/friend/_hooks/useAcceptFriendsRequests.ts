import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '~/api/base';
import { queryKeys } from '~/api/queryKey';

interface Request {
  id: number;
}

const patchAcceptFriendsRequests = (payload: Request) =>
  fetcher.patch<HttpResponse>(`v1/friends/requests/${payload.id}/accept`, { json: {} });

export const useAcceptFriendsRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAcceptFriendsRequests,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' });
    },
  });
};
