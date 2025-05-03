import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, GameLicense } from '@/components/ui';
import { DefaultStepNavigator } from '@/components/ui/step-navigator';

export const SignInPage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        navigate('/signin');
        break;
      case 1:
        navigate('/signup');
        break;
      case 2:
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding css={css({ marginTop: '74px' })} />
      <DefaultStepNavigator
        items={['CONTINUE WITH GOOGLE', 'CONTINUE WITH EMAIL', 'GO BACK']}
        onSelect={handleSelect}
      />
      <GameLicense />
    </Flex>
  );
};
