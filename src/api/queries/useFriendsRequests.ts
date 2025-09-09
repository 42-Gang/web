import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKey';

export const useFriendsRequests = () => useQuery(queryKeys.friends.requests);

export const useSuspenseFriendsRequests = () => useSuspenseQuery(queryKeys.friends.requests);
