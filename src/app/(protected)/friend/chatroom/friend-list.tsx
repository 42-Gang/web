'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { queryKeys } from '~/api';
import { FriendItem } from '~/components/ui';
import { routes } from '~/constants/routes';

interface Props extends ComponentProps<'ul'> {
  currentFriendId: number | null;
}

export const FriendList = ({ className, currentFriendId, ...props }: Props) => {
  const { data } = useSuspenseQuery(queryKeys.friends.me);

  return (
    <ul className={twMerge('column border-neutral-50 border-t', className)} {...props}>
      {data.data.friends.map(friend => (
        <li
          key={friend.friendId}
          className={twMerge(
            'w-full border-b border-b-neutral-50 px-4 py-2 text-white',
            currentFriendId === friend.friendId && 'bg-neutral-50/20',
          )}
        >
          <Link href={`/${routes.friend_chatroom}?friendId=${friend.friendId}`} replace>
            <FriendItem friend={friend} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
