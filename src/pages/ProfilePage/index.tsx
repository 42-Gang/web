import { useUsersMe } from '@/api/queries';
import { BackButton } from '@/components/ui';

import { LogoutButton } from './components/logout-button';
import { LogoutDialog } from './components/logout-dialog';
import { NicknameEditDialog } from './components/nickname-edit-dialog';
import { ProfileImage } from './components/profile-image';
import * as styles from './styles.css';

export const ProfilePage = () => {
  const { data, isLoading, isError } = useUsersMe();

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
                <NicknameEditDialog>
                  <div className={styles.editButton} />
                </NicknameEditDialog>
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
      </div>
    </div>
  );
};
