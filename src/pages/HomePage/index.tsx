import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';
import { PATH } from '@/constants';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        navigate(PATH.SIGNIN_EMAIL);
        break;
      case 1:
        navigate(PATH.SIGNIN_EMAIL);
        break;
      case 2:
        navigate(-1);
        break;
      case 3:
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
        <Branding css={css({ marginTop: '74px' })} />
        <DefaultStepNavigator
          items={['START GAME', 'GAME HISTORY', 'FRIEND', 'PROFILE']}
          onSelect={handleSelect}
        />
        <GameLicense />
      </Flex>
    </>
  );
};
