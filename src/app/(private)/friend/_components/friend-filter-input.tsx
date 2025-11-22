'use client';

import { useQueryState } from 'nuqs';

export const FriendFilterInput = () => {
  const [filter, setFilter] = useQueryState('filter', { defaultValue: '' });

  return (
    <input
      className="h-11 w-full rounded-xl bg-white px-4 text-neutral-950 focus:outline-none"
      placeholder="Search friends..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
    />
  );
};
