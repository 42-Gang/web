import { PropsWithChildren } from 'react';

import { useLogout } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { Dialog, DialogTrigger, DialogOverlay, DialogContent } from '@/components/system';

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
      <DialogContent>
        <p>Do you really want to log out?</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => window.location.reload()}>Cancel</button>
      </DialogContent>
    </Dialog>
  );
};
