import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useChatDmRoomId = (userId: number, friendId: number) =>
  useQuery(queryKeys.chats.dmRoomId(userId, friendId));

export const useSuspenseChatDmRoomId = (userId: number, friendId: number) =>
  useSuspenseQuery(queryKeys.chats.dmRoomId(userId, friendId));
