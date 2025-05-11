import { useRef, useState } from 'react';

import * as styles from './styles.css';
import ImageOptionModal from '../image-option-modal';

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    fileInputRef.current?.click();
    handleCloseModal();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // TODO: useMutation을 사용하는 방법으로 개선 필요
    try {
      const response = await fetch('/api/v1/images/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      // const result = await response.json();
      // // const uploadedUrl = result.data?.avatarUrl;

      // // console.log('업로드 완료:', uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src="/assets/images/sample-avatar.png" alt="sample image" />
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

      {isModalOpen && <ImageOptionModal onClose={handleCloseModal} onEdit={handleEdit} />}
    </>
  );
};

export default ProfileImage;
