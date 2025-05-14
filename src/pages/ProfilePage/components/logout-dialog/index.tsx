import { PropsWithChildren } from 'react';

import { useLogout } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/system';

import * as styles from './styles.css';

export const LogoutDialog = ({ children }: PropsWithChildren) => {
  const { mutate } = useLogout();
  const { removeToken } = useAuthAtom();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        removeToken();
        window.location.href = '/';
      },
      onError: () => {
        alert('Failed to logout.');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay />
      <DialogContent className={styles.content} aria-describedby={undefined}>
        <DialogTitle className={styles.message}>Do you really want to log out?</DialogTitle>

        <div className={styles.group}>
          <button className={styles.logout} onClick={handleLogout}>
            O K
          </button>
          <DialogClose asChild>
            <button className={styles.button}>Cancel</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
