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
  // 친구 관련
  'friend-status': UserStatus;
  'friend-accept': FriendAcceptStatus;
  'friend-request': FriendRequestStatus;

  // 대기방/게임 관련
  'waiting-room-update': WaitingRoomUpdatePayload;
  'tournament-created': TournamentCreatedPayload;
  'custom-invited': CustomInvitedPayload;

  // 채팅
  message: ChatMessageResponse;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

type ClientEventData = {
  // 채팅
  message: ChatMessagePayload;

  // 자동 매칭
  'auto-join': AutoJoinPayload;

  // 커스텀 매칭
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
