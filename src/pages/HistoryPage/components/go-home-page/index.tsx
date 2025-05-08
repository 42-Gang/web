/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants';

import * as styles from './styles.ts';

export const GoHomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.HOME);
  };

  return <styles.Button onClick={handleClick} aria-label="Go to home page" />;
};
