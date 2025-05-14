import { useState } from 'react';
import ReactDOM from 'react-dom';

import { useUpdateProfile } from '@/api/mutations';

import * as styles from './styles.ts';

type Props = {
  onClose: () => void;
};

const EditNicknameModal = ({ onClose }: Props) => {
  const [nickname, setNickname] = useState('');

  const { mutate: updateProfileMutation } = useUpdateProfile();

  const handleConfirm = () => {
    updateProfileMutation(
      { nickname },
      {
        onSuccess: () => {
          alert('닉네임 변경 완료');
          onClose();
        },
        onError: () => {
          alert('닉네임 변경 실패');
        },
      },
    );
  };

  return ReactDOM.createPortal(
    <styles.Overlay>
      <styles.Modal>
        <styles.ModalHeader>
          <strong>Change nickname</strong>
          <styles.CloseButton onClick={onClose}>✕</styles.CloseButton>
        </styles.ModalHeader>

        <styles.Input
          type="text"
          maxLength={10}
          placeholder="Maximum of 10 characters allowed"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <styles.ConfirmButton onClick={handleConfirm}>Confirm</styles.ConfirmButton>
      </styles.Modal>
    </styles.Overlay>,
    document.body,
  );
};

export default EditNicknameModal;
