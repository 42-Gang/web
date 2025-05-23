import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKey';
import { TournamentRoundType } from '@/api/types/game';

export const useTournamentHistory = (type: TournamentRoundType) =>
  useQuery(queryKeys.tournamentHistory(type));

export const useSuspenseTournamentHistory = (type: TournamentRoundType) =>
  useSuspenseQuery(queryKeys.tournamentHistory(type));
