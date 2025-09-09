import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { UserProfilePayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useUserProfile = (payload: UserProfilePayload) =>
  useQuery(queryKeys.users.profile(payload));

export const useSuspenseUserProfile = (payload: UserProfilePayload) =>
  useSuspenseQuery(queryKeys.users.profile(payload));
