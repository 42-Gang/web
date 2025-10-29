'use client';

import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { queryKeys } from '~/api/queryKey';
import { HistoryFilterTabs } from './history-filter-tabs';
import { HistoryGameTypeSelector } from './history-game-type-selector';
import { HistoryList } from './history-list';

export function HistoryContent() {
  const { data: me } = useSuspenseQuery(queryKeys.users.me);
  const [gameType] = useQueryState('type', { defaultValue: 'duel' });
  const [filter] = useQueryState('filter', { defaultValue: 'all' });

  const [{ data: duelStats }, { data: tournamentStats }] = useSuspenseQueries({
    queries: [
      queryKeys.games.stats({ userId: me.data.id, mode: 'duel' }),
      queryKeys.games.stats({ userId: me.data.id, mode: 'tournament' }),
    ],
  });

  const currentStats = gameType === 'duel' ? duelStats : tournamentStats;
  const currentHistory = currentStats.data.history || [];

  return (
    <>
      <HistoryGameTypeSelector />

      <HistoryFilterTabs
        wins={currentStats.data.summary.wins ?? 0}
        losses={currentStats.data.summary.losses ?? 0}
        currentFilter={filter}
      />

      <HistoryList
        gameType={gameType}
        history={currentHistory}
        filter={filter}
        currentUserId={me.data.id}
      />
    </>
  );
}
