import { PropsWithChildren, useState, useRef, useEffect } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfileMutation } = useUpdateProfile();

  const handleSubmit = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    updateProfileMutation(
      { nickname },
      {
        onSuccess: () => {
          toast.success('닉네임 변경 완료');
          setNickname('');
          setIsOpen(false);
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error('닉네임 변경 실패');
          setIsSubmitting(false);
        },
      },
    );
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={styles.content}>
        <DialogClose />

        <DialogTitle className={styles.title}>Change nickname</DialogTitle>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Max 8 letters!"
          maxLength={8}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }
          }}
        />
        <button type="button" className={styles.button} onClick={handleSubmit}>
          Confirm
        </button>
      </DialogContent>
    </Dialog>
  );
};
