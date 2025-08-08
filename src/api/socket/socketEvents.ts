import {
  FriendAcceptStatus,
  FriendRequestStatus,
  UserStatus,
  AutoJoinPayload,
  CustomCreatePayload,
  CustomInvitePayload,
  CustomAcceptPayload,
  CustomStartPayload,
  CustomLeavePayload,
  CustomInviteResponse,
  WaitingRoomUpdateResponse,
  TournamentCreatedResponse,
  ChatMessagePayload,
  ChatMessageResponse,
  CustomCreateResponse,
  MatchInfoType,
  ReadyResponse,
  GameResultResponse,
  MatchCreatedEvent,
} from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  'friend-accept': FriendAcceptStatus;
  'friend-request': FriendRequestStatus;

  'custom-create': CustomCreateResponse;
  'waiting-room-update': WaitingRoomUpdateResponse;
  'tournament-created': TournamentCreatedResponse;
  'custom-invite': CustomInviteResponse;

  message: ChatMessageResponse;

  'match-info': MatchInfoType | MatchCreatedEvent;
  ready: ReadyResponse;
  'game-result': GameResultResponse;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

type ClientEventData = {
  message: ChatMessagePayload;

  'auto-join': AutoJoinPayload;

  'custom-create': CustomCreatePayload;
  'custom-invite': CustomInvitePayload;
  'custom-accept': CustomAcceptPayload;
  'custom-start': CustomStartPayload;
  'custom-leave': CustomLeavePayload;
};

export type ClientToServerEvents = {
  [K in keyof ClientEventData]: (data: ClientEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};
