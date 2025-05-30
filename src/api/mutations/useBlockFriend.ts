import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { HttpResponse } from '@/api/types';

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
