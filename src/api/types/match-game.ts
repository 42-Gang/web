export interface NetCoordinate {
  x: number;
  y: number;
  z: number;
}

export interface GameStateUpdate {
  ball: NetCoordinate;
  racket1: NetCoordinate;
  racket2: NetCoordinate;
}

export interface MatchRacketUpdate {
  x: number;
  y: number;
  z: number;
}

export interface GameCountdown {
  count: number;
}

export interface MatchScore {
  player1Score: number;
  player2Score: number;
}

export interface MatchTimeout {
  reason: string;
  waitingTimeInSeconds: number;
}

export interface WaitingForPlayer {
  waitingForPlayerId: number;
  currentWaitingTimeInSeconds: number;
  timeoutInSeconds: number;
}

export interface GameEndPayload {
  winner: 'PLAYER1' | 'PLAYER2';
  winnerId: number;
  loserId: number;
}
