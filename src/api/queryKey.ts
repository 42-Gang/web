import { HttpResponse, FriendList, UserInfo } from '@/api/types';

import { fetcher } from './fetcher';

const usersQueryKeys = {
  usersMe: () => ({
    _def: 'users-me',
    queryKey: ['users-me'],
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>(`users/me`),
  }),
};

const friendsQueryKeys = {
  friendsMe: () => ({
    _def: 'friend-me',
    queryKey: ['friend-me'],
    queryFn: () =>
      fetcher.get<HttpResponse<FriendList>>(`friends/me?status=ACCEPTED&status=BLOCKED`),
  }),
};

export const queryKeys = {
  ...usersQueryKeys,
  ...friendsQueryKeys,
};
