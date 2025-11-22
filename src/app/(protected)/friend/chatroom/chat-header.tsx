'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { type Friend, queryKeys } from '~/api';
import { CTAButton } from '~/components/ui';
import { useBlockFriend } from '../_hooks/useBlockFriend';
import { useUnblockFriend } from '../_hooks/useUnblockFriend';

interface Props extends ComponentProps<'div'> {
  currentFriendId: number;
}

export const ChatHeader = ({ className, currentFriendId, ...props }: Props) => {
  const { data } = useSuspenseQuery(queryKeys.friends.me);
  const friends: Friend[] = data?.data?.friends ?? [];

  const friend = friends.find(f => f.friendId === currentFriendId);

  const { mutate: blockFriend } = useBlockFriend();
  const { mutate: unblockFriend } = useUnblockFriend();

  if (!friend) {
    return <div>Unknown User</div>;
  }

  const isBlocked = friend.status === 'BLOCKED';

  const handleToggleBlock = () => {
    const payload = { friendId: friend.friendId };

    if (isBlocked) {
      unblockFriend(payload, {
        onSuccess: response => {
          toast.success(response.message);
        },
        onError: () => {
          toast.error('Failed to unblock user.');
        },
      });
    } else {
      blockFriend(payload, {
        onSuccess: response => {
          toast.success(response.message);
        },
        onError: () => {
          toast.error('Failed to block user.');
        },
      });
    }
  };

  return (
    <div className={twMerge('row-between px-4', className)} {...props}>
      <div className="center-y h-14 select-none gap-2">
        <Image
          className="size-10 overflow-hidden rounded-full object-cover"
          src={friend.avatarUrl}
          alt={`${friend.nickname} Profile Image`}
          width={40}
          height={40}
          draggable={false}
        />

        <p className="font-bold text-white text-xl leading-none">{friend.nickname}</p>
      </div>

      <CTAButton size="sm" data-selected={isBlocked} onClick={handleToggleBlock}>
        <span>{isBlocked ? 'UNBLOCK' : 'BLOCK'}</span>
      </CTAButton>
    </div>
  );
};
