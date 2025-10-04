import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpResponse } from '~/api';
import { fetcher } from '../base';
import { queryKeys } from '../queryKey';

type Request = {
  friendId: number;
};

const patchBlockFriend = (payload: Request) =>
  fetcher.patch<HttpResponse>(`v1/friends/${payload.friendId}/block`, { json: {} });

export const useBlockFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBlockFriend,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.friends._def });
    },
  });
};
