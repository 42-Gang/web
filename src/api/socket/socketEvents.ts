import type {
  FriendAcceptStatus,
  FriendRequestStatus,
  UserStatus,
  CustomRoomCreatePayload,
  CustomRoomInvitePayload,
  CustomRoomStartPayload,
  WaitingRoomUpdatePayload,
  JoinTournamentRoomPayload,
  CustomRoomAcceptPayload
} from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  'friend-accept': FriendAcceptStatus;
  'friend-request': FriendRequestStatus;

  'room-update': WaitingRoomUpdatePayload;
  'custom-room-created': { roomId: string };
  'custom-room-invited': CustomRoomInvitePayload;
  'custom-room-started': CustomRoomStartPayload;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

type ClientEventPayloads = {
  sendMessage: { text: string };

  joinAutoRoom: JoinTournamentRoomPayload;
  createCustomRoom: CustomRoomCreatePayload;
  inviteCustomRoom: CustomRoomInvitePayload;
  acceptCustomRoom: CustomRoomAcceptPayload;
  startCustomRoom: CustomRoomStartPayload;
  leaveRoom: void;
};

export type ClientToServerEvents = {
  [K in keyof ClientEventPayloads]: ClientEventPayloads[K] extends void
    ? () => void
    : (data: ClientEventPayloads[K]) => void;
};
