import ReactDOM from 'react-dom';

import { useLogout } from '@/api/mutations/useLogout';
import { useAuthAtom } from '@/atoms/useAuthAtom';

import * as styles from './styles.ts';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal = ({ onCancel, onConfirm }: Props) => {
  const { mutate: logout } = useLogout();
  const { removeToken } = useAuthAtom();

  const handleConfirm = () => {
    logout(undefined, {
      onSuccess: () => {
        removeToken();
        window.location.href = '/signin';
        onConfirm();
      },
      onError: (error) => {
        console.error('로그아웃 실패:', error);
        alert('로그아웃에 실패했습니다.');
      },
    });
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
