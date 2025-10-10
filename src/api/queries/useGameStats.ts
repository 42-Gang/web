import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { GameStatsPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useGameStats = (payload: GameStatsPayload) => useQuery(queryKeys.games.stats(payload));

export const useSuspenseGameStats = (payload: GameStatsPayload) =>
  useSuspenseQuery(queryKeys.games.stats(payload));
