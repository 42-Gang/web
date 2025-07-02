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
              : '닉네임이 성공적으로 변경되었습니다.';

          toast.success(message);
          setNickname('');
          setIsOpen(false);
        },
        onError: async (error) => {
          if (error instanceof HTTPError) {
            try {
              const response = await error.response.json();
              const message =
                typeof response.message === 'string'
                  ? response.message.replace(/^body\//, '')
                  : '서버 오류가 발생했습니다.';
              toast.error(message);
            } catch {
              toast.error('서버 응답을 해석하는 중 오류가 발생했습니다.');
            }
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('알 수 없는 오류가 발생했습니다.');
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
