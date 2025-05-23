import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries(queryKeys.friendsMe());
    },
  });
};
