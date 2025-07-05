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
