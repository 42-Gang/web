import { useState } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/system';

import * as styles from './styles.css';

type User = {
  id: number;
  nickname: string;
  avatarUrl: string;
};

const mockUsers: User[] = [
  { id: 1, nickname: 'Woongbi', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 2, nickname: 'WOfagonSlayer', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 3, nickname: 'PixelQueen', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 4, nickname: 'Knightmare', avatarUrl: '/assets/images/sample-avatar.png' },
];

export const InviteFriendDialog = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedIds, setRequestedIds] = useState<number[]>([]);

  const filteredUsers = mockUsers.filter((user) =>
    user.nickname.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  const handleRequest = (id: number, nickname: string) => {
    if (requestedIds.includes(id)) return;
    setRequestedIds((prev) => [...prev, id]);
    toast.success(`Friend request sent to ${nickname}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={styles.fixedDialogContent} aria-describedby={undefined}>
          <DialogTitle className={styles.title}>Invite Friend</DialogTitle>

          <input
            className={styles.input}
            placeholder="Please enter nickname."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.userList}>
            {filteredUsers.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.leftInfo}>
                  <img src={user.avatarUrl} alt={user.nickname} className={styles.avatar} />
                  <span className={styles.nickname}>{user.nickname}</span>
                </div>
                <button
                  className={
                    requestedIds.includes(user.id)
                      ? styles.requestedButton
                      : styles.inviteRequestButton
                  }
                  onClick={() => handleRequest(user.id, user.nickname)}
                  aria-label="Send friend request."
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
