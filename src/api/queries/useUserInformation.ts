// src/hooks/queries/useGameHistory.ts
import { useQuery } from '@tanstack/react-query';

import { HttpResponse } from '@/api/types';
import { UserInfo } from '@/api/types/user';

import { fetcher } from '../fetcher';

export const getUserInformation = async (): Promise<UserInfo> => {
  const res = await fetcher.get<HttpResponse<UserInfo>>('/users/me');
  return res.data;
};

export const useUserInformation = () =>
  useQuery<UserInfo, Error, UserInfo, ['userInformation']>({
    queryKey: ['userInformation'],
    queryFn: getUserInformation,
    staleTime: 1000 * 60 * 10,
  });
