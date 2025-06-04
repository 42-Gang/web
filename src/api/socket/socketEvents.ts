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
  WaitingRoomUpdatePayload,
  TournamentCreatedPayload
} from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  'friend-accept': FriendAcceptStatus;
  'friend-request': FriendRequestStatus;

  'waiting-room-update': WaitingRoomUpdatePayload;
  'tournament-created': TournamentCreatedPayload;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

type ClientEventData = {
  sendMessage: { text: string };

  // auto
  'auto-join': AutoJoinPayload

  //custom
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