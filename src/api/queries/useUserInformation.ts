import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useUserInformation = () => useQuery(queryKeys.userInformation());

export const useSuspenseUserInformation = () => useSuspenseQuery(queryKeys.userInformation());
