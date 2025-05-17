import { type PropsWithChildren } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/system';

import * as styles from './styles.css';

export const FriendRequestDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay />
      <DialogContent className={styles.content} aria-describedby={undefined}>
        <DialogTitle>Invites & Requests</DialogTitle>

        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
