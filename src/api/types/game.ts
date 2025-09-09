export type TournamentRoundType = 'ROUND_2' | 'ROUND_4';
export type VerticalPosition = 'top' | 'bottom';
export type HorizontalVariant = 'left' | 'right';

export type Player = {
  id: string;
  name: string;
  avatarUrl: string;
  win: number;
  lose: number;
  tournament: number;
};

export type WaitingRoomPlayer = {
  id: number;
  nickname: string;
  avatarUrl: string;
  isHost: boolean;
};

export type Match = {
  id: string;
  player1?: Player;
  player2?: Player;
  winnerId?: string;
  children?: [Match, Match];
};

export type TournamentGame = {
  tournament_id: number;
  total_rounds: number;
  winner: string;
};

export type TournamentGameList = {
  game_list: TournamentGame[];
};

export type AutoJoinPayload = {
  tournamentSize: number;
};

export type CustomCreatePayload = {
  tournamentSize: number;
};

export type CustomCreateResponse = {
  roomId: string;
};

export type CustomInvitePayload = {
  roomId: string;
  userId: number;
  tournamentSize?: number;
};

export type CustomInviteResponse = {
  roomId: string;
  hostId: number;
  hostName: string;
  hostAvatarUrl: string;
  tournamentSize?: number;
};

export type CustomAcceptPayload = {
  roomId: string;
};

export type CustomStartPayload = {
  roomId: string;
};

export type CustomLeavePayload = {
  roomId: string;
};

export type WaitingRoomUpdateResponse = {
  users: WaitingRoomPlayer[];
};

export type TournamentCreatedResponse = {
  tournamentId: number;
  size: number;
  mode: string;
};

export type PlayerConnectedResponse = {
  playerId: number;
};
