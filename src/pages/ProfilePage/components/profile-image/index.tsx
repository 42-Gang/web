import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { useDeleteAvatar } from '@/api/mutations/useDeleteAvatar';
import { useUploadAvatar } from '@/api/mutations/useUploadAvatar';
import { useUsersMe } from '@/api/queries/useUsersMe';

import * as styles from './styles.css';
import ImageOptionModal from '../image-option-modal';

type ProfileImageProps = {
  src?: string;
};

const ProfileImage = ({ src }: ProfileImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatarMutation } = useUploadAvatar();
  const { mutate: deleteAvatarMutation } = useDeleteAvatar();

  const { data } = useUsersMe();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(src);

  useEffect(() => {
    setAvatarUrl(data?.data?.avatarUrl);
  }, [data?.data?.avatarUrl]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
    handleCloseModal();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    uploadAvatarMutation(formData, {
      onError: (err) => {
        console.error('이미지 업로드 실패:', err);
      },
    });

    event.target.value = '';
  };

  const handleDelete = () => {
    deleteAvatarMutation(undefined, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (err) => {
        console.error('이미지 삭제 실패:', err);
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src={avatarUrl} alt="Profile" />
        </div>
        <div className={styles.changeButton} onClick={handleOpenModal}>
          <img src="/assets/images/cameraIcon.svg" alt="Camera Icon - Edit Avatar" />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {isModalOpen && (
        <ImageOptionModal onClose={handleCloseModal} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </>
  );
};

export default ProfileImage;
