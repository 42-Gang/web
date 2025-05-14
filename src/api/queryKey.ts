import {
  HttpResponse,
  FriendList,
  UserInfo,
  TournamentGameList,
  TournamentRoundType,
} from '@/api/types';

import { fetcher } from './fetcher';

const usersQueryKeys = {
  usersMe: () => ({
    _def: 'users-me',
    queryKey: ['users-me'],
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>(`v1/users/me`),
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
