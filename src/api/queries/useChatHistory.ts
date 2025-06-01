import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useChatHistory = (roomId: number) => useQuery(queryKeys.chats.history(roomId));

export const useSuspenseChatHistory = (roomId: number) =>
  useSuspenseQuery(queryKeys.chats.history(roomId));
