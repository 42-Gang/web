'use client';

import { useQuery } from '@tanstack/react-query';
import { type ReactNode, useRef, useState } from 'react';
import { queryKeys } from '~/api';
import { CheckIcon, PlusIcon } from '~/components/icon';
import { Dialog } from '~/components/system';
import { FriendItem } from '~/components/ui';

interface InviteDialogProps {
  children: ReactNode;
  onInvite: (friendId: number) => void;
}

export const InviteDialog = ({ onInvite, children }: InviteDialogProps) => {
  const [filter, setFilter] = useState<string>('');
  const [checkedFriends, setCheckedFriends] = useState<Set<number>>(new Set());
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const { data } = useQuery(queryKeys.friends.me);

  const handleInvite = (friendId: number) => {
    const existingTimeout = timeoutRefs.current.get(friendId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    setCheckedFriends(prev => new Set(prev).add(friendId));

    const timeout = setTimeout(() => {
      setCheckedFriends(prev => {
        const next = new Set(prev);
        next.delete(friendId);
        return next;
      });
      timeoutRefs.current.delete(friendId);
    }, 2000);

    timeoutRefs.current.set(friendId, timeout);
    onInvite(friendId);
  };

  return (
    <Dialog>
      <Dialog.Trigger className="flex h-full cursor-pointer">{children}</Dialog.Trigger>
      <Dialog.Content aria-describedby={undefined}>
        <Dialog.Title>Friend Invitation</Dialog.Title>
        <input
          type="text"
          className="mt-6 w-full rounded-lg border border-neutral-50/50 bg-black px-4 py-2 text-white placeholder-neutral-400 focus:border-white focus:outline-none"
          placeholder="Search by nickname"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        <div className="mt-4 max-h-[280px] overflow-y-auto">
          <ul className="space-y-2">
            {data?.data.friends
              .filter(friend => friend.nickname.toLowerCase().includes(filter.toLowerCase()))
              .map(friend => (
                <li
                  key={friend.friendId}
                  className="flex items-center justify-between rounded-lg border border-neutral-50/50 bg-neutral-900/50 p-3"
                >
                  <FriendItem friend={friend} />
                  <button
                    type="button"
                    className="cursor-pointer text-white active:translate-y-px"
                    onClick={() => handleInvite(friend.friendId)}
                  >
                    {checkedFriends.has(friend.friendId) ? (
                      <CheckIcon size={20} />
                    ) : (
                      <PlusIcon size={20} />
                    )}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog>
  );
};
