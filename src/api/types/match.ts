export type MatchPlayerInfoType = {
  userId: number;
  nickname: string;
  profileImage: string;
  state: 'NOTHING' | 'READY' | 'PLAYING' | 'ELIMINATED';
};

export type MatchInfoType = {
  mode: 'AUTO' | 'CUSTOM';
  players: MatchPlayerInfoType[];
  size: number;
};

export type ReadyResponse = {
  type: 'user-ready' | 'all-users-ready';
  userId: number;
};

export type GameResultResponse = {
  tournamentId: number;
  matchId: number;
  player1Id: number;
  player2Id: number;
  score: { player1: number; player2: number };
  winnerId: number;
  loserId: number;
  round: number;
};
