import { ReactNode } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/system/dialog';

type RequestModalProps = {
  children: ReactNode;
};

export const RequestListDialog = ({ children }: RequestModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogOverlay />
      <DialogContent>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
