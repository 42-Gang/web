import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';
import { UserProfilePayload } from '@/api/types';

export const useUserProfile = (payload: UserProfilePayload) =>
  useQuery(queryKeys.users.profile(payload));

export const useSuspenseUserProfile = (payload: UserProfilePayload) =>
  useSuspenseQuery(queryKeys.users.profile(payload));
