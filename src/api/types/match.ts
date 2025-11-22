export interface MatchPlayerInfoType {
  userId: number;
  nickname: string;
  profileImage: string;
  state: 'NOTHING' | 'READY' | 'PLAYING' | 'ELIMINATED';
}

export interface MatchInfoType {
  mode: 'AUTO' | 'CUSTOM';
  players: MatchPlayerInfoType[];
  size: number;
}

export interface MatchCreatedEvent {
  eventType: 'CREATED';
  matchId: number;
  player1Id: number;
  player2Id: number;
  serverName: string;
  tournamentId: number;
}

export interface ReadyResponse {
  type: 'user-ready' | 'all-users-ready';
  userId: number;
}

export interface GameResultResponse {
  tournamentId: number;
  matchId: number;
  player1Id: number;
  player2Id: number;
  score: { player1: number; player2: number };
  winnerId: number;
  loserId: number;
  round: number;
}
