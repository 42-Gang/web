import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useUsersMe = () => useQuery(queryKeys.usersMe());

export const useSuspenseUsersMe = () => useSuspenseQuery(queryKeys.usersMe());
