import { useState, PropsWithChildren } from 'react';
import { toast } from 'sonner';

import { useFriendsMe } from '@/api';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/system';

import * as styles from './styles.css.ts';

type InviteFriendDialogProps = PropsWithChildren<{
  onInvite?: (inviteeId: number) => void;
}>;

export const InviteFriendDialog = ({ children, onInvite }: InviteFriendDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedIds, setRequestedIds] = useState<number[]>([]);

  const { data } = useFriendsMe();
  const friends = data?.data?.friends ?? [];

  const filteredUsers = friends.filter((user) =>
    user.nickname.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  const handleRequest = (id: number, nickname: string) => {
    if (requestedIds.includes(id)) return;
    setRequestedIds((prev) => [...prev, id]);
    toast.success(`You invited ${nickname}`);
    onInvite?.(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={styles.fixedDialogContent}>
          <DialogTitle className={styles.title}>Invite Friend</DialogTitle>

          <input
            className={styles.input}
            placeholder="Please enter nickname."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.userList}>
            {filteredUsers.map((user) => (
              <div key={user.friendId} className={styles.userCard}>
                <div className={styles.leftInfo}>
                  <img src={user.avatarUrl} alt={user.nickname} className={styles.avatar} />
                  <span className={styles.nickname}>{user.nickname}</span>
                </div>
                <button
                  className={
                    requestedIds.includes(user.friendId)
                      ? styles.requestedButton
                      : styles.inviteRequestButton
                  }
                  onClick={() => handleRequest(user.friendId, user.nickname)}
                  aria-label="invite friend."
                />
              </div>
            ))}
          </div>
          <DialogClose />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
