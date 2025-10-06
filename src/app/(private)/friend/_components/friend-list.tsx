'use client';

import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useSuspenseFriendsMe } from '~/api';
import { MailIcon } from '~/components/icon';
import { routes } from '~/constants/routes';
import { getFriendStatusAtom } from '~/stores/friend-status';

const STATUS_CONFIG = [
  { status: 'ONLINE', color: '#00FF55', text: 'ONLINE' },
  { status: 'OFFLINE', color: '#ABABAB', text: 'OFFLINE' },
  { status: 'GAME', color: '#FF0000', text: 'GAME' },
  { status: 'LOBBY', color: '#00FF55', text: 'LOBBY' },
  { status: 'AWAY', color: '#FFFB00', text: 'AWAY' },
  { status: '-', color: '#ABABAB', text: '-' },
] as const;

export const FriendList = () => {
  const { data } = useSuspenseFriendsMe();
  const getFriendStatus = useAtomValue(getFriendStatusAtom);

  return (
    <ul className="column mt-6 w-full flex-1 border-neutral-50 border-t">
      {data.data.friends.map(friend => (
        <li
          key={friend.friendId}
          className="row-between w-full border-b border-b-neutral-50 px-4 py-3 text-white"
        >
          <div className="center-y gap-2">
            <Image
              className="size-10 overflow-hidden rounded-full object-cover"
              src={friend.avatarUrl}
              alt={`${friend.nickname} Profile Image`}
              width={40}
              height={40}
            />
              <div className="column">
                <p className="font-bold text-xl leading-none">{friend.nickname}</p>
                <div className="center-y gap-1">
                  {(() => {
                    const status = getFriendStatus(friend.friendId) ?? '-';
                    const statusConfig = STATUS_CONFIG.find(config => config.status === status) ?? STATUS_CONFIG[5];
                    
                    return (
                      <>
                        <div
                          className="size-2 rounded-full"
                          style={{ backgroundColor: statusConfig.color }}
                        />
                        <span className="text-sm leading-snug">
                          {statusConfig.text}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
          </div>
          <Link
            className={'text-white active:translate-y-px'}
            href={`/${routes.friend_chatroom}?friendId=${friend.friendId}`}
          >
            <MailIcon size={24} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
