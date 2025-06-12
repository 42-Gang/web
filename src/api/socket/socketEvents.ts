import type {
  FriendAcceptStatus,
  FriendRequestStatus,
  UserStatus,
  AutoJoinPayload,
  CustomCreatePayload,
  CustomInvitePayload,
  CustomAcceptPayload,
  CustomStartPayload,
  CustomLeavePayload,
  CustomInvitedPayload,
  WaitingRoomUpdatePayload,
  TournamentCreatedPayload,
  ChatMessagePayload,
  ChatMessageResponse,
} from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  'friend-accept': FriendAcceptStatus;
  'friend-request': FriendRequestStatus;

  'waiting-room-update': WaitingRoomUpdatePayload;
  'tournament-created': TournamentCreatedPayload;
  'custom-invite': CustomInvitedPayload;

  message: ChatMessageResponse;
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
