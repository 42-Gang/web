import type {
  ChatMessageResponse,
  CustomInviteResponse,
  FriendAcceptStatus,
  FriendRequestStatus,
} from '~/api/types';

export type ServerToClientEvents = {
  'friend-request': (data: FriendRequestStatus) => void;
  'friend-accept': (data: FriendAcceptStatus) => void;
  'custom-invite': (data: CustomInviteResponse) => void;
  message: (data: ChatMessageResponse) => void;
};

export type ClientToServerEvents = Record<string, (data: unknown) => void>;
