import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { ChatHistoryPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useChatHistory = (payload: ChatHistoryPayload) =>
  useQuery({
    ...queryKeys.chats.history(payload),
    staleTime: 0,
    gcTime: 0,
  });

export const useSuspenseChatHistory = (payload: ChatHistoryPayload) =>
  useSuspenseQuery({
    ...queryKeys.chats.history(payload),
    staleTime: 0,
    gcTime: 0,
  });
