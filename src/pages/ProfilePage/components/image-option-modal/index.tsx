import ReactDOM from 'react-dom';

import * as styles from './styles.ts';

type Props = {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ImageOptionModal = ({ onClose, onEdit, onDelete }: Props) => {
  return ReactDOM.createPortal(
    <styles.Overlay>
      <styles.Modal>
        <styles.ModalButton onClick={onDelete}>Delete</styles.ModalButton>
        <styles.ModalButton onClick={onEdit}>Edit</styles.ModalButton>
        <styles.ModalButton onClick={onClose}>Cancel</styles.ModalButton>
      </styles.Modal>
    </styles.Overlay>,
    document.body,
  );
};

export default ImageOptionModal;
