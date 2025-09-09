import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKey';

export const useFriendsMe = () => useQuery(queryKeys.friends.me);

export const useSuspenseFriendsMe = () => useSuspenseQuery(queryKeys.friends.me);
