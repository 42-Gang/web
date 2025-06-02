import { UserInfo } from './user';

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

export type JoinTournamentRoomPayload = {
  tournamentSize: number;
};

export type WaitingRoomUpdatePayload =
  | { roomId: string; users: UserInfo[] }
  | { users: UserInfo[] };

export type CustomRoomCreatePayload = {
  tournamentSize: number;
};

export type CustomRoomAcceptPayload = {
  roomId: string;
};

export type CustomRoomInvitePayload = {
  roomId: string;
  userId: string;
};

export type CustomRoomStartPayload = {
  roomId: string;
  tournamentSize: number;
};