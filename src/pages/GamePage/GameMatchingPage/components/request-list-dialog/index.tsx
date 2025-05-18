import { ReactNode } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/system/dialog';

import * as styles from './styles.css.ts';
import { InviteFriend } from '../invite-friend/index.tsx';

type DialogType = 'inviteFriend';

type RequestListDialogProps = {
  type: DialogType;
  children?: ReactNode;
};

export const RequestListDialog = ({ type, children }: RequestListDialogProps) => {
  const renderContent = () => {
    switch (type) {
      case 'inviteFriend':
        return <InviteFriend />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay />

      <DialogContent className={styles.fixedDialogContent}>
        {renderContent()}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
