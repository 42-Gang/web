import { HttpResponse, UserInfo , TournamentGameList } from '@/api/types';

import { fetcher } from './fetcher';

const userQueryKeys = {
  userInformation: () => ({
    _def: 'user-information',
    queryKey: ['user-information'],
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>(`/users/me`),
  }),
};

const gameQueryKeys = {
  tournamentHistory: (type: 'ROUND_2' | 'ROUND_4') => ({
    _def: 'tournament-history',
    queryKey: ['tournament-history', type],
    queryFn: () => fetcher.get<HttpResponse<TournamentGameList>>('/game/history/${type}'),
  }),
};

export const queryKeys = {
  ...userQueryKeys,
  ...gameQueryKeys,
};
