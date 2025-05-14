import ReactDOM from 'react-dom';

import * as styles from './styles.ts';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal = ({ onCancel, onConfirm }: Props) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return ReactDOM.createPortal(
    <styles.Overlay>
      <styles.Modal>
        <styles.Text>Do you really want to log out?</styles.Text>
        <styles.ButtonGroup>
          <styles.ConfirmButton onClick={handleConfirm}>O K</styles.ConfirmButton>
          <styles.CancelButton onClick={onCancel}>Cancel</styles.CancelButton>
        </styles.ButtonGroup>
      </styles.Modal>
    </styles.Overlay>,
    document.body,
  );
};

export default LogoutConfirmModal;
