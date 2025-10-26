'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type ReactNode, useState, useRef } from 'react';
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

  const { data } = useSuspenseQuery(queryKeys.friends.me);

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
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content aria-describedby={undefined}>
        <Dialog.Title>Invite Friend</Dialog.Title>
        <input
          className="mt-3 h-10 w-full rounded-xl bg-white px-4 text-neutral-950"
          placeholder="Search friends..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        <div className="column mt-4 max-h-[280px] overflow-y-auto">
          <ul className="column w-full flex-1 border-neutral-50 border-t">
            {data.data.friends
              .filter(friend => friend.nickname.toLowerCase().includes(filter.toLowerCase()))
              .map(friend => (
                <li
                  key={friend.friendId}
                  className="row-between w-full border-b border-b-neutral-50 px-4 py-3 text-white"
                >
                  <FriendItem friend={friend} />
                  <button
                    type="button"
                    className="cursor-pointer text-white active:translate-y-px"
                    onClick={() => handleInvite(friend.friendId)}
                  >
                    {checkedFriends.has(friend.friendId) ? (
                      <CheckIcon size={24} />
                    ) : (
                      <PlusIcon size={24} />
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
