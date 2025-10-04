import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

type Request = {
  friendId: number;
};

const patchUnblockFriend = (payload: Request) =>
  fetcher.patch<HttpResponse>(`v1/friends/${payload.friendId}/unblock`, { json: {} });

export const useUnblockFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUnblockFriend,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.friends._def });
    },
  });
};
