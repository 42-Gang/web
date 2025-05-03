/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';

import * as styles from './styles.ts';

type BrandingProps = {
  css?: Interpolation<Theme>;
};

export const Branding = ({ css }: BrandingProps) => {
  return (
    <styles.Brand css={css}>
      PING PONG
      <br />
      Gang
    </styles.Brand>
  );
};
