import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { ChatDMRoomPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useChatDMRoomId = (payload: ChatDMRoomPayload) =>
  useQuery(queryKeys.chats.dmRoomId(payload));

export const useSuspenseChatDmRoomId = (payload: ChatDMRoomPayload) =>
  useSuspenseQuery(queryKeys.chats.dmRoomId(payload));
