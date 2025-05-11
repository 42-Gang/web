import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useFriendsMe = () => useQuery(queryKeys.friendsMe());

export const useSuspenseFriendsMe = () => useSuspenseQuery(queryKeys.friendsMe());
