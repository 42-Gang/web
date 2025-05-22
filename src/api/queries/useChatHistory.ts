import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useChatHistory = (roomId: string) => useQuery(queryKeys.chatHistory(roomId));

export const useSuspenseChatHistory = (roomId: string) =>
  useSuspenseQuery(queryKeys.chatHistory(roomId));
