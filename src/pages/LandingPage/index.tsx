import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Branding, StepNavigator } from '@/components/ui';

import * as styles from './styles.ts';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        navigate('/signin');
        break;
      case 1:
        navigate('/signup');
        break;
      default:
        break;
    }
  };

  return (
    <styles.Container>
      <Branding css={css({ marginTop: '74px' })} />
      <StepNavigator items={['SIGN IN', 'SIGN UP']} onSelect={handleSelect} />
      <styles.LicenseText>
        TH & C 1980 1993 NAMCO LTD.
        <br />
        NAMCO HOMETEK, INC.
        <br />
        LICENSED BY NINTENDO
      </styles.LicenseText>
    </styles.Container>
  );
};
