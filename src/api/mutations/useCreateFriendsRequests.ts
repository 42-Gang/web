import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

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
      await queryClient.invalidateQueries({ queryKey: queryKeys.users._def, refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: queryKeys.friends._def, refetchType: 'all' });
    },
  });
};
