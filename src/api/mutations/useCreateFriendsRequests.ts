import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { HttpResponse } from '@/api/types';

type Request = {
  friendId: number;
};

const postFriendsRequests = (payload: Request) =>
  fetcher.post<HttpResponse>('v1/friends/requests', { json: payload });

export const useCreateFriendsRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFriendsRequests,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ ...queryKeys.friendsMe(), refetchType: 'all' });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.usersSearch({ nickname: '', exceptMe: true, status: 'NONE' })._def],
        refetchType: 'all',
      });
    },
  });
};
