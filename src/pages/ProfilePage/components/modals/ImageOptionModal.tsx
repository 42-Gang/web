import ReactDOM from 'react-dom';

import * as styles from './image-option-modal.styles';

interface Props {
  onClose: () => void;
  onEdit: () => void;
}

const ImageOptionModal = ({ onClose, onEdit }: Props) => {
  return ReactDOM.createPortal(
    <styles.Overlay>
      <styles.Modal>
        <styles.ModalButton onClick={() => alert('Delete')}>Delete</styles.ModalButton>
        <styles.ModalButton onClick={onEdit}>Edit</styles.ModalButton>
        <styles.ModalButton onClick={onClose}>Cancel</styles.ModalButton>
      </styles.Modal>
    </styles.Overlay>,
    document.body,
  );
};

export default ImageOptionModal;
