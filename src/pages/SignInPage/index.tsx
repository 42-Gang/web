import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Flex } from '@/components/system';
import { Branding, GameLicense, DefaultStepNavigator } from '@/components/ui';
import { PATH } from '@/constants';

export const SignInPage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        toast('Google sign-in is not implemented yet');
        break;
      case 1:
        navigate(PATH.SIGNIN_EMAIL);
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

export { EmailSignInPage } from './EmailLoginPage';
