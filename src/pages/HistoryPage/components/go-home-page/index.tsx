/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';

// import { useNavigate } from 'react-router-dom';

import * as styles from './styles.ts';

type GoHomePageProps = {
  css?: Interpolation<Theme>;
};

export const GoHomePage = ({ css }: GoHomePageProps) => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/')
  // }; // 이후에 메인 페이지 만들어지면 작업할 예정

  return <styles.Button css={css}></styles.Button>;
};
