import { SearchParamsOption } from 'ky';

import {
  HttpResponse,
  FriendList,
  UserInfo,
  TournamentGameList,
  TournamentRoundType,
  UsersSearchPayload,
  UserList,
} from '@/api/types';

import { fetcher } from './fetcher';

const usersQueryKeys = {
  usersMe: () => ({
    _def: 'users-me',
    queryKey: ['users-me'],
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>(`v1/users/me`),
  }),
  usersSearch: (payload: UsersSearchPayload) => ({
    _def: 'users-search',
    queryKey: ['users-search', payload],
    queryFn: () => {
      const searchParams: SearchParamsOption = {
        status: payload.status,
        exceptMe: payload.exceptMe,
      };
      return fetcher.get<HttpResponse<UserList>>(`v1/users/search/${payload.nickname}`, {
        searchParams,
      });
    },
    enabled: payload.nickname.length > 1,
  }),
};

const friendsQueryKeys = {
  friendsMe: () => ({
    _def: 'friend-me',
    queryKey: ['friend-me'],
    queryFn: () =>
      fetcher.get<HttpResponse<FriendList>>(`v1/friends/me?status=ACCEPTED&status=BLOCKED`),
  }),
};

const gameQueryKeys = {
  tournamentHistory: (type: TournamentRoundType) => ({
    _def: 'tournament-history',
    queryKey: ['tournament-history', type],
    queryFn: () => fetcher.get<HttpResponse<TournamentGameList>>(`v1/game/history/${type}`),
  }),
};

export const queryKeys = {
  ...usersQueryKeys,
  ...friendsQueryKeys,
  ...gameQueryKeys,
};
