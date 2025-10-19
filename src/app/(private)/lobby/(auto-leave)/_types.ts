export type MatchingMode = '1vs1' | 'tournament';

export const isValidMode = (value: unknown): value is MatchingMode =>
  value === '1vs1' || value === 'tournament';
