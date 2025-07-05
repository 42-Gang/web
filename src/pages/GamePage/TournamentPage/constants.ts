export const TOURNAMENT_ROUNDS = {
  FINAL: 'ROUND_2',
  SEMI_FINAL: 'ROUND_4',
} as const;

export const PLAYER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const WINNER_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export const TOURNAMENT_SIZES = {
  DUEL: 2,
  QUAD: 4,
} as const;

export const TOURNAMENT_LABELS = {
  [TOURNAMENT_SIZES.DUEL]: '1vs1',
  [TOURNAMENT_SIZES.QUAD]: '4인 토너먼트',
} as const;

export const DEFAULT_PLAYER_STATS = {
  win: 0,
  lose: 0,
  tournament: 0,
} as const;

export const PLAYER_STATS_LABELS = {
  WIN: 'win',
  LOSE: 'lose',
  TOURNAMENT: 'tournament',
} as const;
