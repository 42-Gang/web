export type TournamentGame = {
  tournament_id: number;
  total_rounds: number;
  winner: string;
};

export type TournamentGameList = {
  game_list: TournamentGame[];
};

export type TournamentRoundType = 'ROUND_2' | 'ROUND_4';
