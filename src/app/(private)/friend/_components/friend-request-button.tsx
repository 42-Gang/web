'use client';

import { twMerge } from 'tailwind-merge';
import { useSuspenseFriendsRequests } from '~/api';
import { BellIcon, BellRingIcon } from '~/components/icon';

export const FriendRequestButton = () => {
  const { data } = useSuspenseFriendsRequests();
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
