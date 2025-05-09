import * as styles from './styles';

const ProfileImage = () => {
  const handleOpenModal = () => {};

  return (
    <styles.ImageContainer>
      <styles.ImageWrapper>
        <styles.Avatar src="/assets/images/sample-avatar.png" alt="avatar" />
      </styles.ImageWrapper>
      <styles.CameraIcon onClick={handleOpenModal}>📷</styles.CameraIcon>
    </styles.ImageContainer>
  );
};

export default ProfileImage;
