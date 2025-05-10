import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoutButton from '../logout-button';
import * as styles from './styles';
import EditNicknameModal from '../edit-nickname-modal';
import LogoutConfirmModal from '../logout-confirm-modal';
import ProfileImage from '../profile-image';

const ProfileCard = () => {
  const navigate = useNavigate();
  const nickname = 'PONG';

  const [isEditNicknameOpen, setIsEditNicknameOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleNicknameEdit = () => setIsEditNicknameOpen(true);
  const handleClose = () => navigate(-1);

  const handleLogoutClick = () => setIsLogoutModalOpen(true);
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    alert('로그아웃 되었습니다');
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
              <styles.EditButton onClick={handleNicknameEdit} />
            </styles.NicknameWrapper>
          </p>
          <p>WIN : 45</p>
          <p>LOSE : 45</p>
          <p>Tournament : 897</p>
        </styles.Info>
      </styles.Content>
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
    </styles.CardWrapper>
  );
};

export default ProfileCard;
