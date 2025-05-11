import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';

export const useTournamentHistory = (type: 'ROUND_2' | 'ROUND_4') =>
  useQuery(queryKeys.tournamentHistory(type));

export const useSuspenseTournamentHistory = (type: 'ROUND_2' | 'ROUND_4') =>
  useSuspenseQuery(queryKeys.tournamentHistory(type));
