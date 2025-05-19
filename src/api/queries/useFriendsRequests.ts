import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useFriendsRequests = () => useQuery(queryKeys.friendsRequests());

export const useSuspenseFriendsRequests = () => useSuspenseQuery(queryKeys.friendsRequests());
