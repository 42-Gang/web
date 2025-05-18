import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { HttpResponse } from '@/api/types';

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
      await queryClient.invalidateQueries(queryKeys.friendsRequests());
      await queryClient.invalidateQueries({ ...queryKeys.friendsMe(), refetchType: 'all' });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.usersSearch({ nickname: '', exceptMe: true, status: 'NONE' })._def],
        refetchType: 'all',
      });
    },
  });
};
