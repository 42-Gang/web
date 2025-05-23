import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries(queryKeys.friendsMe());
    },
  });
};
