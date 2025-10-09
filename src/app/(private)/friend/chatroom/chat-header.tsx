'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { type Friend, useBlockFriend, useSuspenseFriendsMe, useUnblockFriend } from '~/api';
import { CTAButton } from '~/components/ui';

interface Props extends ComponentProps<'div'> {
  currentFriendId: number;
}

export const ChatHeader = ({ className, currentFriendId, ...props }: Props) => {
  const { data } = useSuspenseFriendsMe();
  const friends: Friend[] = data?.data?.friends ?? [];

  const friend = friends.find(f => f.friendId === currentFriendId);

  const { mutate: blockFriend } = useBlockFriend();
  const { mutate: unblockFriend } = useUnblockFriend();

  if (!friend) {
    return <div>친구 정보를 찾을 수 없습니다.</div>;
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
          toast.error('차단 해제에 실패했습니다.');
        },
      });
    } else {
      blockFriend(payload, {
        onSuccess: response => {
          toast.success(response.message);
        },
        onError: () => {
          toast.error('차단에 실패했습니다.');
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
        />

        <p className="font-bold text-white text-xl leading-none">{friend.nickname}</p>
      </div>

      <CTAButton size="sm" data-selected={isBlocked} onClick={handleToggleBlock}>
        <span>{isBlocked ? 'UNBLOCK' : 'BLOCK'}</span>
      </CTAButton>
    </div>
  );
};
