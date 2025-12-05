import type {
  ChatMessageResponse,
  CustomCreateResponse,
  CustomInviteResponse,
  FriendAcceptStatus,
  FriendRequestStatus,
  GameCountdown,
  GameEndPayload,
  GameResultResponse,
  GameStateUpdate,
  MatchCreatedEvent,
  MatchInfoType,
  MatchRacketUpdate,
  MatchScore,
  MatchTimeout,
  PlayerConnectedResponse,
  ReadyResponse,
  TournamentCreatedResponse,
  UserStatus,
  WaitingForPlayer,
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

  'game-state-update': (data: GameStateUpdate) => void;
  'game-start': () => void;
  'game-end': (data: GameEndPayload) => void;
  'game-countdown': (data: GameCountdown) => void;
  'match-score': (data: MatchScore) => void;
  'match-timeout': (data: MatchTimeout) => void;
  'waiting-for-player': (data: WaitingForPlayer) => void;
  'player-connected': (data: PlayerConnectedResponse) => void;
  'countdown-cancelled': () => void;

  connect: () => void;
  disconnect: () => void;
}

export interface ClientToServerEvents {
  'match-racket-update': (data: MatchRacketUpdate) => void;
  ready: (data: object) => void;
  'auto-join': (data: { tournamentSize: number }) => void;
  'custom-create': (data: { tournamentSize: number }) => void;
  'custom-accept': (data: { roomId: string }) => void;
  'custom-invite': (data: { roomId: string; userId: number }) => void;
  'custom-start': (data: { roomId: string }) => void;
  'custom-leave': (data: { roomId: string }) => void;
  'auto-leave': (data: { tournamentSize: number }) => void;
  message: (data: { roomId: number; contents: string }) => void;
}
