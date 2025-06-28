import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants';

import * as styles from './styles.css';

type BackButtonProps = {
  href?: string;
  onClick?: () => void;
};

export const BackButton = ({ href, onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(href ?? PATH.HOME);
    }
  };

  return (
    <button className={styles.button} onClick={handleClick} aria-label="Go to previous page" />
  );
};
