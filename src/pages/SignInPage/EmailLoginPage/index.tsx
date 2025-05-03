import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';

export const EmailSignInPage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        toast('Google sign-in is not implemented yet');
        break;
      case 1:
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding css={css({ marginTop: '74px' })} />
      <Flex direction="column" justifyContent="center">
        <DefaultStepNavigator items={['CONTINUE', 'GO BACK']} onSelect={handleSelect} />
      </Flex>
      <GameLicense />
    </Flex>
  );
};
