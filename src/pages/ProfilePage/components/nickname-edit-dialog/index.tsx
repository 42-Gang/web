import { HTTPError } from 'ky';
import { PropsWithChildren, useState, useRef } from 'react';
import { toast } from 'sonner';

import { useUpdateProfile } from '@/api';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/system';

import * as styles from './styles.css';

export const NicknameEditDialog = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();

  const handleSubmit = async () => {
    if (isPending) return;

    updateProfileMutation(
      { nickname },
      {
        onSuccess: (response) => {
          const message =
            typeof response.message === 'string'
              ? response.message.replace(/^body\//, '')
              : 'Nickname updated successfully.';

          toast.success(message);
          setNickname('');
          setIsOpen(false);
        },
        onError: async (error) => {
          if (error instanceof HTTPError) {
            try {
              const res = await error.response.json();
              const message =
                typeof res.message === 'string'
                  ? res.message.replace(/^body\//, '')
                  : 'Failed to update nickname.';

              toast.error(message);
            } catch {
              toast.error('Failed to parse server response.');
            }
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('An unknown error occurred while updating nickname.');
          }
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className={styles.content}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        aria-describedby={undefined}
      >
        <DialogClose />
        <DialogTitle className={styles.title}>Change nickname</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ display: 'contents' }}
        >
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Max 8 letters!"
            maxLength={8}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit" className={styles.button} disabled={isPending}>
            Confirm
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
