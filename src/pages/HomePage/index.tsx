import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';
import { PATH } from '@/constants';
import { spacing } from '@/styles';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    const paths = [PATH.GAME, PATH.HISTORY, PATH.FRIEND, PATH.PROFILE];
    if (index >= 0 && index < paths.length) {
      navigate(paths[index]);
    }
  };

  return (
    <>
      <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
        <Branding css={css({ marginTop: spacing.brandingTopMargin })} />
        <DefaultStepNavigator
          items={['START GAME', 'HISTORY', 'FRIEND', 'PROFILE']}
          onSelect={handleSelect}
        />
        <GameLicense />
      </Flex>
    </>
  );
};
