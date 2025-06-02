import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useChatHistory = (roomId: number) =>
  useQuery({
    ...queryKeys.chats.history(roomId),
    staleTime: 0,
    gcTime: 0,
  });

export const useSuspenseChatHistory = (roomId: number) =>
  useSuspenseQuery({
    ...queryKeys.chats.history(roomId),
    staleTime: 0,
    gcTime: 0,
  });
