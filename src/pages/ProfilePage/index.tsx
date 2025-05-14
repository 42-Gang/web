import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { useLogout } from '@/api/mutations';
import { useUsersMe } from '@/api/queries';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { BackButton } from '@/components/ui';

import EditNicknameModal from './components/edit-nickname-modal';
import { LogoutButton } from './components/logout-button';
import LogoutConfirmModal from './components/logout-confirm-modal';
import ProfileImage from './components/profile-image';
import * as styles from './styles.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditNicknameOpen, setIsEditNicknameOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { data, isLoading, isError } = useUsersMe();
  const { mutate: logoutMutation } = useLogout();
  const { removeToken } = useAuthAtom();

  const handleNicknameEdit = () => setIsEditNicknameOpen(true);
  const handleLogoutClick = () => setIsLogoutModalOpen(true);

  const handleLogoutConfirm = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        setIsLogoutModalOpen(false);
        removeToken();
        navigate('/signin');
      },
      onError: () => {
        alert('Failed to logout.');
      },
    });
  };

  if (isLoading) return <div className={styles.container}>Loading...</div>;
  if (isError || !data?.data)
    return <div className={styles.container}>Failed to load data. Please try again later...</div>;

  const { nickname, avatarUrl, win, lose, tournament } = data.data;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <BackButton />

        <h1 className={styles.title}>Profile</h1>
        <div className={styles.content}>
          <div className={styles.profileImage}>
            <ProfileImage src={avatarUrl} />
          </div>
          <div className={styles.metadata}>
            <div>
              Nickname :&nbsp;
              <div className={styles.nickname}>
                <strong>{nickname}</strong>
                <button className={styles.editButton} onClick={handleNicknameEdit} />
              </div>
            </div>
            <p>WIN : {win}</p>
            <p>LOSE : {lose}</p>
            <p>Tournament : {tournament}</p>
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
