'use client';

import { useQueryState } from 'nuqs';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';

interface Props {
  wins: number;
  losses: number;
  currentFilter: string;
}

export const HistoryFilterTabs = ({ wins, losses, currentFilter }: Props) => {
  const [, setFilter] = useQueryState('filter', { defaultValue: 'all' });

  const filters = [
    { key: 'win', label: 'WIN', count: wins },
    { key: 'lose', label: 'LOSE', count: losses },
    { key: 'all', label: 'ALL', count: wins + losses },
  ];

  return (
    <div className={twMerge('column-center-x gap-4', SuperPixel.className)}>
      <div className="flex justify-center gap-8">
        {filters.map(filter => (
          <div key={filter.key} className="column-center-x">
            <span className="font-medium text-white text-xl">{filter.label}</span>
            <span className="font-bold text-2xl text-yellow-300">{filter.count}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {filters.map(filter => (
          <button
            type="button"
            key={filter.key}
            onClick={() => setFilter(filter.key)}
            className={twMerge(
              'cursor-pointer rounded-lg px-4 py-2 font-medium text-sm transition-all',
              'border border-white',
              currentFilter === filter.key
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:bg-white/20',
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
