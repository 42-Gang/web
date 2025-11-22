'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { type PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import { queryKeys } from '~/api';
import { useAcceptFriendsRequests, useRejectFriendsRequests } from '~/api/mutations';
import { CheckIcon, TimesIcon } from '~/components/icon';
import { Dialog } from '~/components/system';

export const FriendRequestDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useSuspenseQuery(queryKeys.friends.requests);
  const { mutate: acceptRequest, isPending: isAccepting } = useAcceptFriendsRequests();
  const { mutate: rejectRequest, isPending: isRejecting } = useRejectFriendsRequests();

  const requests = data.data.requests || [];
  const isPending = isAccepting || isRejecting;

  const handleAccept = (userId: number, nickname: string) => {
    if (isPending) return;

    acceptRequest(
      { id: userId },
      {
        onSuccess: () => {
          console.log('[friend/friend-request-dialog] Friend request accepted successfully');
          toast.success(`You accepted ${nickname}'s friend request.`);
        },
        onError: error => {
          console.error('[friend/friend-request-dialog] Failed to accept friend request:', error);
          toast.error('Failed to accept friend request.');
        },
      },
    );
  };

  const handleReject = (userId: number, nickname: string) => {
    if (isPending) return;

    rejectRequest(
      { id: userId },
      {
        onSuccess: () => {
          console.log('[friend/friend-request-dialog] Friend request rejected successfully');
          toast.success(`You rejected ${nickname}'s friend request.`);
        },
        onError: error => {
          console.error('[friend/friend-request-dialog] Failed to reject friend request:', error);
          toast.error('Failed to reject friend request.');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Friend Requests</Dialog.Title>
        <Dialog.Description className="mt-2 text-center">
          You can accept or reject friend requests.
        </Dialog.Description>

        <div className="mt-6 max-h-64 overflow-y-auto">
          {requests.length > 0 ? (
            <div className="space-y-2">
              {requests.map(request => (
                <div
                  key={request.userId}
                  className="flex items-center justify-between rounded-lg border border-neutral-50/50 bg-neutral-900/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={request.avatarUrl}
                      alt={request.nickname}
                      width={40}
                      height={40}
                      className="size-10 rounded-full"
                      draggable={false}
                    />
                    <span className="text-white">{request.nickname}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAccept(request.userId, request.nickname)}
                      className="center size-8 cursor-pointer rounded-lg border border-green-500/50 bg-green-500/20 text-green-500 hover:bg-green-500/30 active:translate-y-px disabled:opacity-50"
                      disabled={isPending}
                    >
                      <CheckIcon size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(request.userId, request.nickname)}
                      className="center size-8 cursor-pointer rounded-lg border border-red-500/50 bg-red-500/20 text-red-500 hover:bg-red-500/30 active:translate-y-px disabled:opacity-50"
                      disabled={isPending}
                    >
                      <TimesIcon size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-neutral-400">No friend requests.</div>
          )}
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog>
  );
};
