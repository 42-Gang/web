'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';
import { queryKeys } from '~/api';
import { BellIcon, BellRingIcon } from '~/components/icon';

export const FriendRequestButton = () => {
  const { data } = useSuspenseQuery(queryKeys.friends.requests);
  const requestsCount: number = data.data.requests.length ?? 0;

  return (
    <button
      type="button"
      className={twMerge(
        '-translate-y-1/2 absolute top-1/2 right-4 shrink-0 cursor-pointer text-white',
        'active:-translate-y-[calc(50%-1px)]',
      )}
    >
      {requestsCount > 0 ? <BellRingIcon size={24} /> : <BellIcon size={24} />}
    </button>
  );
};
