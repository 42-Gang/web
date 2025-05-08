import LogoutButton from '@/pages/ProfilePage/components/logout-button';
import ProfileImage from '@/pages/ProfilePage/components/profile-image';

import * as S from './styles';

const ProfileCard = () => {
  const nickname = 'PONG';

  const handleNicknameEdit = () => {};

  return (
    <S.CardWrapper>
      <S.CloseButton>×</S.CloseButton>
      <S.Title>Profile</S.Title>
      <S.Content>
        <ProfileImage />
        <S.Info>
          <p>
            Nickname :
            <S.NicknameWrapper>
              <strong>{nickname}</strong>
              <S.EditButton onClick={handleNicknameEdit}>✏️</S.EditButton>
            </S.NicknameWrapper>
          </p>
          <p>WIN : 45</p>
          <p>LOSE : 45</p>
          <p>Tournament : 897</p>
        </S.Info>
      </S.Content>
      <LogoutButton />
    </S.CardWrapper>
  );
};

export default ProfileCard;
