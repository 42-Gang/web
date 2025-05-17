import { type PropsWithChildren } from 'react';

import { useFriendsRequests } from '@/api';
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

                <div>
                  <button className={styles.button}>Decline</button>
                  <button className={styles.button}>Accept</button>
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
