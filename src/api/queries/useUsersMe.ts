import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKey';

export const useUsersMe = () => useQuery(queryKeys.users.me);

export const useSuspenseUsersMe = () => useSuspenseQuery(queryKeys.users.me);
