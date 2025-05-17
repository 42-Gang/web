import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';

import { useAcceptFriendsRequests, useFriendsRequests, useRejectFriendsRequests } from '@/api';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/system';

import * as styles from './styles.css';

export const FriendRequestDialog = ({ children }: PropsWithChildren) => {
  const { data } = useFriendsRequests();

  const { mutate: acceptFriendsRequestsMutation } = useAcceptFriendsRequests();
  const { mutate: rejectFriendsRequestsMutation } = useRejectFriendsRequests();

  const handleAccept = (id: number) => {
    acceptFriendsRequestsMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('Friend request accepted successfully.');
        },
        onError: (error) => {
          console.error('Error accepting friend request:', error);
          toast.error('Failed to accept friend request.');
        },
      },
    );
  };

  const handleReject = (id: number) => {
    rejectFriendsRequestsMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('Friend request rejected successfully.');
        },
        onError: (error) => {
          console.error('Error rejecting friend request:', error);
          toast.error('Failed to reject friend request.');
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay />
      <DialogPortal>
        <DialogContent className={styles.content} aria-describedby={undefined}>
          <DialogTitle className={styles.title}>Invites & Requests</DialogTitle>

          <ul className={styles.list} aria-label="Requests list">
            {data?.data?.requests.map((request) => (
              <li key={request.userId} className={styles.item}>
                <div className={styles.metadata}>
                  <img className={styles.avatar} src={request.avatarUrl} alt="Friend" />
                  <span className={styles.nickname}>{request.nickname}</span>
                </div>

                <div className={styles.buttonGroup}>
                  <button aria-label="Reject" onClick={() => handleReject(request.userId)}>
                    <img
                      className={styles.button}
                      src="/assets/images/rejection.svg"
                      alt="Reject Button"
                      draggable={false}
                    />
                  </button>
                  <button aria-label="Send request" onClick={() => handleAccept(request.userId)}>
                    <img
                      className={styles.button}
                      src="/assets/images/approval.svg"
                      alt="Approve Button"
                      draggable={false}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <DialogClose />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
