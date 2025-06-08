import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants';

import * as styles from './styles.css';

type BackButtonProps = {
  href?: string;
};

export const BackButton = ({ href }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href ?? PATH.HOME);
  };

  return (
    <button className={styles.button} onClick={handleClick} aria-label="Go to previous page" />
  );
};
