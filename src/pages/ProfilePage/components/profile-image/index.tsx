import { useEffect, useRef, useState } from 'react';

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
  const { mutate: uploadAvatar } = useUploadAvatar();
  const { mutate: deleteAvatar } = useDeleteAvatar();
  const { data, refetch } = useUsersMe();
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    uploadAvatar(formData, {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        console.error('이미지 업로드 실패:', err);
      },
    });
    // 같은 파일 다시 선택 가능하도록 초기화
    event.target.value = '';
  };

  const handleDelete = () => {
    deleteAvatar(undefined, {
      onSuccess: () => {
        refetch();
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
