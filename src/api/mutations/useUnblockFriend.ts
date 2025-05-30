import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/api';
import { queryKeys } from '@/api/queryKey';
import { HttpResponse } from '@/api/types';

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
