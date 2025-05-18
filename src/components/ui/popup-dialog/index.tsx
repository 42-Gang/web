import { ReactNode } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/system/dialog';
import { AddFriend } from '@/pages/FriendPage/components/add-friend';
import { GeneralAlarm } from '@/pages/FriendPage/components/general-alarm';
import { InviteFriend } from '@/pages/GamePage/GameMatchingPage/components/invite-friend';

type DialogType = 'addFriend' | 'alarm' | 'inviteFriend';

type DialogWrapperProps = {
  type: DialogType;
  children?: ReactNode;
  contentClassName?: string;
};

export const DialogWrapper = ({ type, children, contentClassName }: DialogWrapperProps) => {
  const renderContent = () => {
    switch (type) {
      case 'addFriend':
        return <AddFriend />;
      case 'alarm':
        return <GeneralAlarm />;
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
      <DialogContent className={contentClassName}>
        {renderContent()}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
