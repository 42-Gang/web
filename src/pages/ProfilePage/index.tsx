import { useState } from 'react';

import { BackButton } from '@/components/ui';

import EditNicknameModal from './components/edit-nickname-modal';
import { LogoutButton } from './components/logout-button';
import LogoutConfirmModal from './components/logout-confirm-modal';
import ProfileImage from './components/profile-image';
import * as styles from './styles.css';

export const ProfilePage = () => {
  const nickname = 'PONG';

  const [isEditNicknameOpen, setIsEditNicknameOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleNicknameEdit = () => setIsEditNicknameOpen(true);

  const handleLogoutClick = () => setIsLogoutModalOpen(true);
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    alert('로그아웃 되었습니다');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <BackButton />

        <h1 className={styles.title}>Profile</h1>
        <div className={styles.content}>
          <div className={styles.profileImage}>
            <ProfileImage />
          </div>
          <div className={styles.metadata}>
            <div>
              Nickname :&nbsp;
              <div className={styles.nickname}>
                <strong>{nickname}</strong>
                <button className={styles.editButton} onClick={handleNicknameEdit} />
              </div>
            </div>
            <p>WIN : 45</p>
            <p>LOSE : 45</p>
            <p>Tournament : 897</p>
          </div>
        </div>
        <div onClick={handleLogoutClick}>
          <LogoutButton />
        </div>

        {isEditNicknameOpen && <EditNicknameModal onClose={() => setIsEditNicknameOpen(false)} />}

        {isLogoutModalOpen && (
          <LogoutConfirmModal
            onCancel={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogoutConfirm}
          />
        )}
      </div>
    </div>
  );
};
