import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { TournamentRoundType } from '~/api';
import { queryKeys } from '../queryKey';

export const useTournamentHistory = (type: TournamentRoundType) =>
  useQuery(queryKeys.games.tournamentHistory(type));

export const useSuspenseTournamentHistory = (type: TournamentRoundType) =>
  useSuspenseQuery(queryKeys.games.tournamentHistory(type));
