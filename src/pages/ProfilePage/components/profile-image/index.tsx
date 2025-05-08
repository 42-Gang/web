import * as S from './styles';

const ProfileImage = () => {
  const handleOpenModal = () => {};

  return (
    <S.ImageContainer>
      <S.ImageWrapper>
        <S.Avatar src="/assets/images/sample-avatar.png" alt="avatar" />
      </S.ImageWrapper>
      <S.CameraIcon onClick={handleOpenModal}>📷</S.CameraIcon>
    </S.ImageContainer>
  );
};

export default ProfileImage;
