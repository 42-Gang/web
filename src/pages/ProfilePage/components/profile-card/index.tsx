import { useNavigate } from 'react-router-dom';

import LogoutButton from '../logout-button';
import ProfileImage from '../profile-image';
import * as styles from './styles';

const ProfileCard = () => {
  const navigate = useNavigate();
  const nickname = 'PONG';

  const handleNicknameEdit = () => {};

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <styles.CardWrapper>
      <styles.CloseButton onClick={handleClose} />
      <styles.Title>Profile</styles.Title>
      <styles.Content>
        <ProfileImage />
        <styles.Info>
          <p>
            Nickname :
            <styles.NicknameWrapper>
              <strong>{nickname}</strong>
              <styles.EditButton onClick={handleNicknameEdit}>✏️</styles.EditButton>
            </styles.NicknameWrapper>
          </p>
          <p>WIN : 45</p>
          <p>LOSE : 45</p>
          <p>Tournament : 897</p>
        </styles.Info>
      </styles.Content>
      <LogoutButton />
    </styles.CardWrapper>
  );
};

export default ProfileCard;
