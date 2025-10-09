import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import { fetcher } from './base';
import type {
  ChatDMRoomPayload,
  ChatDMRoomResponse,
  ChatHistory,
  ChatHistoryPayload,
  FriendList,
  FriendRequestUserList,
  HttpResponse,
  TournamentGameList,
  TournamentRoundType,
  UserInfo,
  UserList,
  UserProfilePayload,
  UsersSearchPayload,
} from './types';

const userQueryKeys = createQueryKeys('users', {
  me: {
    queryKey: null,
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>('v1/users/me'),
  },
  search: (payload: UsersSearchPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      if (payload.nickname.length < 3) {
        return Promise.resolve({
          status: 'SUCCESS',
          message: 'Search term too short',
          data: { users: [] },
        } as HttpResponse<UserList>);
      }

      const searchParams = new URLSearchParams();
      payload.status.forEach(status => {
        searchParams.append('status', status);
      });
      searchParams.append('exceptMe', String(payload.exceptMe));

      return fetcher.get<HttpResponse<UserList>>(`v1/users/search/${payload.nickname}`, {
        searchParams,
      });
    },
  }),
  profile: (payload: UserProfilePayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<HttpResponse<UserInfo>>(`v1/users/${payload.id}`),
  }),
});

const friendsQueryKeys = createQueryKeys('friends', {
  me: {
    queryKey: null,
    queryFn: () =>
      fetcher.get<HttpResponse<FriendList>>('v1/friends/me?status=ACCEPTED&status=BLOCKED'),
  },
  requests: {
    queryKey: null,
    queryFn: () => fetcher.get<HttpResponse<FriendRequestUserList>>('v1/friends/requests'),
  },
});

const gameQueryKeys = createQueryKeys('games', {
  tournamentHistory: (type: TournamentRoundType) => ({
    queryKey: [type],
    queryFn: () => fetcher.get<HttpResponse<TournamentGameList>>(`v1/game/history/${type}`),
  }),
});

const chatQueryKeys = createQueryKeys('chats', {
  history: (payload: ChatHistoryPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<HttpResponse<ChatHistory>>(`v1/chat/${payload.roomId}/messages`),
  }),
  dmRoomId: (payload: ChatDMRoomPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<HttpResponse<ChatDMRoomResponse>>(
        `v1/chat/room/dm?userId=${payload.userId}&friendId=${payload.friendId}`,
      ),
  }),
});

export const queryKeys = mergeQueryKeys(
  userQueryKeys,
  friendsQueryKeys,
  gameQueryKeys,
  chatQueryKeys,
);
