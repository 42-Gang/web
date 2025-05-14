import { useUsersMe } from '@/api/queries';

import * as styles from './styles.css';
import { ImageOptionDialog } from '../image-option-dialog';

const ProfileImage = () => {
  const { data } = useUsersMe();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src={data?.data?.avatarUrl} alt={data?.data?.nickname} />
        </div>
        <ImageOptionDialog>
          <div className={styles.changeButton}>
            <img src="/assets/images/cameraIcon.svg" alt="Camera Icon - Edit Avatar" />
          </div>
        </ImageOptionDialog>
      </div>
    </>
  );
};

export default ProfileImage;
