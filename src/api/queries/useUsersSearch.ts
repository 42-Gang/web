import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { UsersSearchPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useUsersSearch = (payload: UsersSearchPayload) =>
  useQuery(queryKeys.users.search(payload));

export const useSuspenseUsersSearch = (payload: UsersSearchPayload) =>
  useSuspenseQuery(queryKeys.users.search(payload));
