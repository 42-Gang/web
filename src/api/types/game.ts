import { UserInfo } from '@/api';

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
};

export type CustomInvitedPayload = {
  roomId: string;
  hostId: number;
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

export type WaitingRoomUpdatePayload = {
  users: UserInfo[];
};

export type TournamentCreatedPayload = {
  tournamentId: number;
  size: number;
  mode: string;
};
