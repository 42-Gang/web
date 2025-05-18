import { type PropsWithChildren, useState } from 'react';
import { useDebounce } from 'react-simplikit';
import { toast } from 'sonner';

import { useCreateFriendsRequests, useUsersSearch } from '@/api';
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

export const FriendSearchDialog = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const { data } = useUsersSearch({
    nickname,
    exceptMe: true,
    status: 'NONE',
  });

  const debouncedNickname = useDebounce((value: string) => {
    setNickname(value);
  }, 300);

  const { mutate } = useCreateFriendsRequests();
  const handleRequest = (id: number) => {
    mutate(
      { friendId: id },
      {
        onSuccess: () => {
          setValue('');
          setNickname('');
          toast.success('Friend request sent successfully.');
        },
        onError: (error) => {
          console.error('Error sending friend request:', error);
          toast.error('Failed to send friend request.');
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className={styles.content} aria-describedby={undefined}>
          <DialogTitle className={styles.title}>ADD Friend</DialogTitle>

          <input
            className={styles.input}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              debouncedNickname(e.target.value);
            }}
            placeholder="Please enter nickname."
          />

          <ul className={styles.list} aria-label="Search result">
            {data?.data?.users.map((user) => (
              <li key={user.id} className={styles.item}>
                <div className={styles.metadata}>
                  <img className={styles.avatar} src={user.avatarUrl} alt={user.nickname} />
                  <span className={styles.nickname}>{user.nickname}</span>
                </div>

                <button onClick={() => handleRequest(user.id)} aria-label="Send request">
                  <img
                    className={styles.button}
                    src="/assets/images/request-friend.svg"
                    alt="Request Button"
                    draggable={false}
                  />
                </button>
              </li>
            ))}
          </ul>
          <DialogClose />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
