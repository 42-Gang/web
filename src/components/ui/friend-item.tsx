'use client';

import { useAtomValue } from 'jotai';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Friend } from '~/api/types';
import { getFriendStatusAtom } from '~/stores/friend-status';

const STATUS_CONFIG = [
  { status: 'ONLINE', color: '#00FF55', text: 'ONLINE' },
  { status: 'OFFLINE', color: '#ABABAB', text: 'OFFLINE' },
  { status: 'GAME', color: '#FF0000', text: 'GAME' },
  { status: 'LOBBY', color: '#00FF55', text: 'LOBBY' },
  { status: 'AWAY', color: '#FFFB00', text: 'AWAY' },
  { status: '-', color: '#ABABAB', text: '-' },
] as const;

interface FriendItemProps extends ComponentProps<'div'> {
  friend: Friend;
}

export const FriendItem = ({ friend, className, ...props }: FriendItemProps) => {
  const getFriendStatus = useAtomValue(getFriendStatusAtom);

  return (
    <div className={twMerge('center-y select-none gap-2', className)} {...props}>
      <Image
        className="size-10 overflow-hidden rounded-full object-cover"
        src={friend.avatarUrl}
        alt={`${friend.nickname} Profile Image`}
        width={40}
        height={40}
        draggable={false}
      />
      <div className="column">
        <p className="font-bold text-xl leading-none">{friend.nickname}</p>
        <div className="center-y gap-1">
          {(() => {
            const status = getFriendStatus(friend.friendId) ?? '-';
            const statusConfig =
              STATUS_CONFIG.find(config => config.status === status) ?? STATUS_CONFIG[5];

            return (
              <>
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: statusConfig.color }}
                />
                <span className="text-sm leading-snug">{statusConfig.text}</span>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
