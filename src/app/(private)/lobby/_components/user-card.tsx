'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSuspenseUsersMe, type WaitingRoomPlayer } from '~/api';

interface Props extends ComponentProps<'div'> {
  user: WaitingRoomPlayer;
}

export const UserCard = ({ user, className, ...props }: Props) => {
  const { data: me } = useSuspenseUsersMe();

  const isMe = me.data.id === user.id;

  return (
    <div
      className={twMerge(
        'column-center-x h-full w-[200px] p-4',
        isMe ? 'bg-[#A03434]' : 'bg-[#34A09B]',
        className,
      )}
      {...props}
    >
      <Image
        className="size-[120px] rounded-full border-2 border-black object-cover"
        src={user.avatarUrl}
        alt={`${user.nickname} 프로필 이미지`}
        width={120}
        height={120}
      />
      {user.isHost && <p className="text-center text-[#ECF411]">Master</p>}
    </div>
  );
};
