'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { type PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { queryKeys } from '~/api';
import { PlusIcon } from '~/components/icon';
import { Dialog } from '~/components/system';
import { useCreateFriendsRequests } from '../_hooks/useCreateFriendsRequests';

const UserSearchList = ({ searchTerm }: { searchTerm: string }) => {
  const { data: searchResults } = useSuspenseQuery(
    queryKeys.users.search({
      nickname: searchTerm,
      status: ['NONE', 'PENDING'],
      exceptMe: true,
    }),
  );
  const { mutate: createFriendRequest, isPending } = useCreateFriendsRequests();

  const handleAddFriend = (friendId: number, nickname: string) => {
    if (isPending) return;

    createFriendRequest(
      { friendId },
      {
        onSuccess: () => {
          toast.success(`Friend request sent to ${nickname}.`);
        },
        onError: () => {
          toast.error('Failed to send friend request.');
        },
      },
    );
  };

  const users = searchResults?.data?.users || [];

  if (users.length === 0) {
    if (searchTerm.length === 0) {
      return null;
    }
    if (searchTerm.length < 3) {
      return (
        <div className="text-center text-neutral-400">Please enter at least 3 characters.</div>
      );
    }
    return searchTerm ? <div className="text-center text-neutral-400">User not found.</div> : null;
  }

  return (
    <div className="space-y-2">
      {users.map(user => (
        <div
          key={user.id}
          className="flex items-center justify-between rounded-lg border border-neutral-50/50 bg-neutral-900/50 p-3"
        >
          <div className="flex items-center gap-3">
            <Image
              src={user.avatarUrl}
              alt={user.nickname}
              width={40}
              height={40}
              className="size-10 rounded-full"
              draggable={false}
            />
            <span className="text-white">{user.nickname}</span>
          </div>
          <button
            type="button"
            onClick={() => handleAddFriend(user.id, user.nickname)}
            className="cursor-pointer text-white active:translate-y-px"
            disabled={isPending}
          >
            <PlusIcon size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const AddFriendDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      setSearchTerm('');
      setDebouncedSearchTerm('');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Add Friend</Dialog.Title>
        <Dialog.Description className="mt-2 text-center">
          Search for friends by username.
        </Dialog.Description>

        <div className="mt-6">
          <input
            type="text"
            className="w-full rounded-lg border border-neutral-50/50 bg-black px-4 py-2 text-white placeholder-neutral-400 focus:border-white focus:outline-none"
            placeholder="Enter username"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4 max-h-64 overflow-y-auto">
          <Suspense fallback={<div className="text-center text-neutral-400">Searching...</div>}>
            <UserSearchList searchTerm={debouncedSearchTerm} />
          </Suspense>
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog>
  );
};
