import type {
  ChatMessageResponse,
  CustomCreateResponse,
  CustomInviteResponse,
  FriendAcceptStatus,
  FriendRequestStatus,
  GameResultResponse,
  MatchCreatedEvent,
  MatchInfoType,
  ReadyResponse,
  TournamentCreatedResponse,
  UserStatus,
  WaitingRoomUpdateResponse,
} from '~/api/types';

export interface ServerToClientEvents {
  'friend-request': (data: FriendRequestStatus) => void;
  'friend-accept': (data: FriendAcceptStatus) => void;
  'friend-status': (data: UserStatus) => void;

  message: (data: ChatMessageResponse) => void;

  'custom-invite': (data: CustomInviteResponse) => void;
  'custom-create': (data: CustomCreateResponse) => void;
  'waiting-room-update': (data: WaitingRoomUpdateResponse) => void;
  'tournament-created': (data: TournamentCreatedResponse) => void;
  'match-info': (data: MatchInfoType | MatchCreatedEvent) => void;
  ready: (data: ReadyResponse) => void;
  'game-result': (data: GameResultResponse) => void;
}

export type ClientToServerEvents = Record<string, (data: unknown) => void>;
