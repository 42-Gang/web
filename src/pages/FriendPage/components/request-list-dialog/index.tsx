import { ReactNode } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/system/dialog';

import * as styles from './styles.css.ts';
import { AddFriend } from '../add-friend/index.tsx';
import { GeneralAlarm } from '../general-alarm/index.tsx';

type DialogType = 'addFriend' | 'alarm';

type RequestListDialogProps = {
  type: DialogType;
  children?: ReactNode;
};

export const RequestListDialog = ({ type, children }: RequestListDialogProps) => {
  const renderContent = () => {
    switch (type) {
      case 'addFriend':
        return <AddFriend />;
      case 'alarm':
        return <GeneralAlarm />;
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
