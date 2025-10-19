'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSuspenseUsersMe, type WaitingRoomPlayer } from '~/api';
import { AvatarFrameIcon, GunIcon } from '~/components/icon';

interface Props extends ComponentProps<'div'> {
  user: WaitingRoomPlayer | null;
  onClick?: () => void;
}

export const UserCard = ({ user, className, onClick, ...props }: Props) => {
  const { data: me } = useSuspenseUsersMe();

  const isMe = (user && me.data.id === user.id) ?? false;

  return (
    <div
      className={twMerge(
        'column-between h-full w-[200px] gap-6 px-4 py-6',
        'shadow-[4px_4px_0px_0px_var(--color-neutral-800)]',
        isMe ? 'bg-[#A03434]' : 'bg-[#34A09B]',
        className,
      )}
      {...props}
    >
      <div className="column-center-x gap-4">
        <button
          type="button"
          className={twMerge(
            'center relative size-[120px]',
            onClick ? 'cursor-pointer' : 'cursor-default',
          )}
          onClick={onClick}
        >
          {user ? (
            <Image
              className="size-[120px] overflow-hidden rounded-full border-2 border-transparent object-cover"
              src={user.avatarUrl}
              alt={`${user.nickname} 프로필 이미지`}
              onError={e => {
                e.currentTarget.src = '/assets/img-anonymous-profile.png';
              }}
              width={120}
              height={120}
              draggable={false}
            />
          ) : (
            <div className="size-[120px] overflow-hidden rounded-full border-2 border-transparent">
              <div className="size-full bg-[#FFE296]" />
            </div>
          )}
          <AvatarFrameIcon className="absolute inset-0 text-neutral-950" size={120} />
        </button>

        {user?.isHost && <p className="text-center text-[#ECF411]">Master</p>}
      </div>

      <div className="column-center-x gap-4">
        <GunIcon size={96} />
        <p className="text-2xl">{user ? user.nickname : '-'}</p>
      </div>
    </div>
  );
};
