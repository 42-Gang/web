import { HttpResponse, UserInfo } from '@/api/types';

import { fetcher } from './fetcher';

const userQueryKeys = {
  userInformation: () => ({
    _def: 'user-information',
    queryKey: ['user-information'],
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>(`/users/me`),
  }),
};

export const queryKeys = {
  ...userQueryKeys,
};
