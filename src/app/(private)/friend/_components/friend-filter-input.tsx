'use client';

import { useQueryState } from 'nuqs';

export const FriendFilterInput = () => {
  const [filter, setFilter] = useQueryState('filter', {
    defaultValue: '',
    shallow: false,
  });

  return (
    <input
      className="h-11 w-full rounded-xl bg-white px-4"
      placeholder="Search friends..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
    />
  );
};
