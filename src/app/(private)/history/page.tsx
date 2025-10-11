'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { twMerge } from 'tailwind-merge';
import { useSuspenseUsersMe } from '~/api/queries/useUsersMe';
import { queryKeys } from '~/api/queryKey';
import { SuperPixel } from '~/app/_fonts';
import { HistoryFilterTabs } from '~/app/(private)/history/_components/history-filter-tabs';
import { HistoryGameTypeSelector } from '~/app/(private)/history/_components/history-game-type-selector';
import { HistoryList } from '~/app/(private)/history/_components/history-list';
import { CloseButton } from '~/components/ui';

const Page = () => {
  const { data: user } = useSuspenseUsersMe();
  const [gameType] = useQueryState('type', { defaultValue: 'duel' });
  const [filter] = useQueryState('filter', { defaultValue: 'all' });

  const [{ data: duelStats }, { data: tournamentStats }] = useSuspenseQueries({
    queries: [
      queryKeys.games.stats({ userId: user.data.id, mode: 'duel' }),
      queryKeys.games.stats({ userId: user.data.id, mode: 'tournament' }),
    ],
  });

  const currentStats = gameType === 'duel' ? duelStats : tournamentStats;
  const currentHistory = currentStats?.data?.history || [];

  return (
    <>
      <CloseButton />
      <div className="column-center-x h-full gap-6 p-6">
        <h1 className={twMerge('font-bold text-3xl text-white', SuperPixel.className)}>
          SELECT GAME TYPE
        </h1>

        <HistoryGameTypeSelector />

        <HistoryFilterTabs
          wins={currentStats?.data?.summary?.wins || 0}
          losses={currentStats?.data?.summary?.losses || 0}
          currentFilter={filter}
        />

        <HistoryList
          gameType={gameType}
          history={currentHistory}
          filter={filter}
          currentUserId={user.data.id}
        />
      </div>
    </>
  );
};

export default Page;
