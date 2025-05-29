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

  const handleSubmit = () => {
    if (isPending) return;

    updateProfileMutation(
      { nickname },
      {
        onSuccess: () => {
          toast.success('닉네임 변경 완료');
          setNickname('');
          setIsOpen(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error('닉네임 변경 실패');
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
