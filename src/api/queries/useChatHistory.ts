import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useChatHistory = (roomId: string) => useQuery(queryKeys.chatHistory(roomId));

export const useChatDmRoomId = (userId: number, friendId: number) =>
  useQuery(queryKeys.chatDmRoomId(userId, friendId));
