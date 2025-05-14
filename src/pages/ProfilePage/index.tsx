import { useState } from 'react';

import { useUsersMe } from '@/api/queries';
import { BackButton } from '@/components/ui';

import EditNicknameModal from './components/edit-nickname-modal';
import { LogoutButton } from './components/logout-button';
import { LogoutDialog } from './components/logout-dialog';
import ProfileImage from './components/profile-image';
import * as styles from './styles.css';

export const ProfilePage = () => {
  const [isEditNicknameOpen, setIsEditNicknameOpen] = useState(false);

  const { data, isLoading, isError } = useUsersMe();

  const handleNicknameEdit = () => setIsEditNicknameOpen(true);

  if (isLoading) return <div className={styles.container}>Loading...</div>;
  if (isError || !data?.data)
    return <div className={styles.container}>Failed to load data. Please try again later...</div>;

  const { nickname, win, lose, tournament } = data.data;

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
            <p>WIN : {win ?? '-'}</p>
            <p>LOSE : {lose ?? '-'}</p>
            <p>Tournament : {tournament ?? '-'}</p>
          </div>
        </div>

        <LogoutDialog>
          <LogoutButton />
        </LogoutDialog>

        {isEditNicknameOpen && <EditNicknameModal onClose={() => setIsEditNicknameOpen(false)} />}
      </div>
    </div>
  );
};
