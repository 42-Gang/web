import {
  FriendAcceptStatus,
  FriendRequestStatus,
  ChatMessageResponse,
  UserStatus,
  ChatMessagePayload,
} from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  'friend-accept': FriendAcceptStatus;
  'friend-request': FriendRequestStatus;
  message: ChatMessageResponse;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

export interface ClientToServerEvents {
  message: (data: ChatMessagePayload) => void;
}
