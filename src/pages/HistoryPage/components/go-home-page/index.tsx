/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants';

import * as styles from './styles.ts';

type GoHomePageProps = {
  css?: Interpolation<Theme>;
};

export const GoHomePage = ({ css }: GoHomePageProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.HOME);
  };

  return (
    <styles.Button css={css} onClick={handleClick} aria-label="Go to home page"></styles.Button>
  );
};
