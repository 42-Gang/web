import { type ChangeEvent, PropsWithChildren, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useDeleteAvatar, useUploadAvatar } from '@/api';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/system';

import * as styles from './styles.css';

export const ImageOptionDialog = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: deleteAvatarMutation } = useDeleteAvatar();

  const handleDelete = () => {
    deleteAvatarMutation(undefined, {
      onError: (err) => {
        console.error('이미지 삭제 실패:', err);
        toast.error('Failed to delete image.');
      },
      onSettled: () => setIsOpen(false),
    });
  };

  const { mutate: uploadAvatarMutation } = useUploadAvatar();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    uploadAvatarMutation(formData, {
      onError: (err) => {
        console.error('이미지 업로드 실패:', err);
        toast.error('Failed to upload image.');
      },
      onSettled: () => setIsOpen(false),
    });

    event.target.value = '';
  };

  const handleEdit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay />
      <DialogContent className={styles.content} aria-describedby={undefined}>
        <DialogTitle style={{ display: 'none' }}>Edit Profile Image Options</DialogTitle>

        <div className={styles.group}>
          <button className={styles.button} onClick={handleDelete}>
            Delete
          </button>
          <button className={styles.button} onClick={handleEdit}>
            Upload
          </button>
          <DialogClose asChild>
            <button className={styles.button}>Cancel</button>
          </DialogClose>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </DialogContent>
    </Dialog>
  );
};
