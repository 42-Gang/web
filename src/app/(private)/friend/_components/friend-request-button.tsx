'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';
import { queryKeys } from '~/api';
import { BellIcon, BellRingIcon } from '~/components/icon';
import { FriendRequestDialog } from './friend-request-dialog';

export const FriendRequestButton = () => {
  const { data } = useSuspenseQuery(queryKeys.friends.requests);
  const requestsCount: number = data.data.requests.length ?? 0;

  return (
    <FriendRequestDialog>
      <button type="button" className={twMerge('shrink-0 cursor-pointer text-white')}>
        {requestsCount > 0 ? (
          <BellRingIcon size={35} className="text-yellow-200" />
        ) : (
          <BellIcon size={35} />
        )}
      </button>
    </FriendRequestDialog>
  );
};
