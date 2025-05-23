import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants';

import * as styles from './styles.css';

type BackButtonProps = {
  toPath?: string;
};

export const BackButton = ({ toPath }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(toPath ?? PATH.HOME);
  };

  return <button className={styles.button} onClick={handleClick} aria-label="Go to home page" />;
};
