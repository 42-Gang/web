import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Branding, StepNavigator } from '@/components/ui';

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
    <>
      <Branding />
      <StepNavigator
        css={css({ marginTop: '80px' })}
        items={['SIGN IN', 'SIGN UP']}
        onSelect={handleSelect}
      />
    </>
  );
};
