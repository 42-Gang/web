import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants';

import * as styles from './styles.css.ts';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.HOME);
  };

  return <button className={styles.button} onClick={handleClick} aria-label="Go to home page" />;
};
