import { useState } from 'react';
import ReactDOM from 'react-dom';

import * as styles from './edit-nickname-modal.styles';

interface Props {
  onClose: () => void;
}

const EditNicknameModal = ({ onClose }: Props) => {
  const [nickname, setNickname] = useState('');

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

        <styles.ConfirmButton onClick={() => alert(`닉네임: ${nickname}`)}>
          Confirm
        </styles.ConfirmButton>
      </styles.Modal>
    </styles.Overlay>,
    document.body,
  );
};

export default EditNicknameModal;
