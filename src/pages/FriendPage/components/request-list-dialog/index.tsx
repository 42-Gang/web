import { ReactNode } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/system/dialog';

import * as styles from './styles.css.ts';

type RequestModalProps = {
  children: ReactNode;
  content: ReactNode;
};

export const RequestListDialog = ({ children, content }: RequestModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay />

      <DialogContent className={styles.fixedDialogContent}>
        {content}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
