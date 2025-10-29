'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { queryKeys, useCreateFriendsRequests } from '~/api';
import { PlusIcon } from '~/components/icon';
import { Dialog } from '~/components/system';

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

  const { data: searchResults, isLoading } = useSuspenseQuery(
    queryKeys.users.search({
      nickname: debouncedSearchTerm,
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
          console.log('[friend/add-friend-dialog] Friend request sent successfully');
          toast.success(`${nickname}님에게 친구 요청을 보냈습니다.`);
        },
        onError: error => {
          console.error('[friend/add-friend-dialog] Failed to send friend request:', error);
          toast.error('친구 요청 전송에 실패했습니다.');
        },
      },
    );
  };

  const users = searchResults?.data?.users || [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>친구 추가</Dialog.Title>
        <Dialog.Description className="mt-2 text-center">
          사용자명을 입력하여 친구를 찾아보세요.
        </Dialog.Description>

        <div className="mt-6">
          <input
            type="text"
            className="w-full rounded-lg border border-neutral-50/50 bg-black px-4 py-2 text-white placeholder-neutral-400 focus:border-white focus:outline-none"
            placeholder="사용자명을 입력하세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4 max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-neutral-400">검색 중...</div>
          ) : users.length > 0 ? (
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
          ) : debouncedSearchTerm ? (
            <div className="text-center text-neutral-400">사용자를 찾을 수 없습니다.</div>
          ) : null}
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog>
  );
};
