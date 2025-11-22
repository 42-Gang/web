'use client';

import { twMerge } from 'tailwind-merge';
import { UsersIcon } from '~/components/icon';
import { AddFriendDialog } from './add-friend-dialog';

export const AddFriendButton = () => {
  return (
    <AddFriendDialog>
      <button
        type="button"
        className={twMerge('shrink-0 cursor-pointer text-white active:translate-y-px')}
      >
        <UsersIcon size={35} />
      </button>
    </AddFriendDialog>
  );
};
