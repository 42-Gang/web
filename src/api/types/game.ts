export type TournamentRoundType = 'ROUND_2' | 'ROUND_4';
export type VerticalPosition = 'top' | 'bottom';
export type HorizontalVariant = 'left' | 'right';

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  win: number;
  lose: number;
  tournament: number;
}

export interface WaitingRoomPlayer {
  id: number;
  nickname: string;
  avatarUrl: string;
  isHost: boolean;
}

export interface Match {
  id: string;
  player1?: Player;
  player2?: Player;
  winnerId?: string;
  children?: [Match, Match];
}

export interface TournamentGame {
  tournament_id: number;
  total_rounds: number;
  winner: string;
}

export interface TournamentGameList {
  game_list: TournamentGame[];
}

export interface AutoJoinPayload {
  tournamentSize: number;
}

export interface CustomCreatePayload {
  tournamentSize: number;
}

export interface CustomCreateResponse {
  roomId: string;
}

export interface CustomInvitePayload {
  roomId: string;
  userId: number;
  tournamentSize?: number;
}

export interface CustomInviteResponse {
  roomId: string;
  hostId: number;
  hostName: string;
  hostAvatarUrl: string;
  tournamentSize?: number;
}

export interface CustomAcceptPayload {
  roomId: string;
}

export interface CustomStartPayload {
  roomId: string;
}

export interface CustomLeavePayload {
  roomId: string;
}

export interface WaitingRoomUpdateResponse {
  users: WaitingRoomPlayer[];
}

export interface TournamentCreatedResponse {
  tournamentId: number;
  size: number;
  mode: string;
}

export interface PlayerConnectedResponse {
  playerId: number;
}

export interface GameStatsPayload {
  userId: number;
  mode: 'duel' | 'tournament';
}

interface GameParticipant {
  id: number;
  nickname: string;
}

export interface TournamentHistoryItem {
  tournamentId: number;
  rounds: number;
  participants: GameParticipant[];
  myResult: 'WIN' | 'LOSS';
}

export interface DuelHistoryItem {
  tournamentId: number;
  date: string;
  player1: GameParticipant;
  player2: GameParticipant;
  result: {
    winnerId: number;
    scores: {
      player1: number;
      player2: number;
    };
  };
}

interface TournamentStatsData {
  mode: 'tournament';
  summary: {
    wins: number;
    losses: number;
  };
  history: TournamentHistoryItem[];
}

interface DuelStatsData {
  mode: 'duel';
  summary: {
    wins: number;
    losses: number;
  };
  history: DuelHistoryItem[];
}

export type GameStatsResponse = TournamentStatsData | DuelStatsData;
