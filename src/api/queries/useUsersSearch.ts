import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';
import { UsersSearchPayload } from '@/api/types';

export const useUsersSearch = (payload: UsersSearchPayload) =>
  useQuery(queryKeys.users.search(payload));

export const useSuspenseUsersSearch = (payload: UsersSearchPayload) =>
  useSuspenseQuery(queryKeys.users.search(payload));
