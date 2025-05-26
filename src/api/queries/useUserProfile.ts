import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useUserProfile = (id: number) => useQuery(queryKeys.userProfile(id));
