import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useChatHistory = (roomId: string) => useQuery(queryKeys.chats.history(roomId));

export const useSuspenseChatHistory = (roomId: string) =>
  useSuspenseQuery(queryKeys.chats.history(roomId));
