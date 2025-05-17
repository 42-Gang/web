import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { HttpResponse } from '@/api/types';

type Request = {
  id: number;
};

const patchAcceptFriendsRequests = (payload: Request) =>
  fetcher.patch<HttpResponse>(`v1/friends/requests/${payload.id}/accept`, { json: {} });

export const useAcceptFriendsRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAcceptFriendsRequests,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ ...queryKeys.friendsMe(), refetchType: 'all' });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.usersSearch({ nickname: '', exceptMe: true, status: 'NONE' })._def],
        refetchType: 'all',
      });
    },
  });
};
