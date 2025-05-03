/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';

import * as styles from './styles.ts';

type GameLicenseProps = {
  css?: Interpolation<Theme>;
};

export const GameLicense = ({ css }: GameLicenseProps) => {
  return (
    <styles.License css={css}>
      TH & C 1980 1993 NAMCO LTD.
      <br />
      NAMCO HOMETEK, INC.
      <br />
      LICENSED BY NINTENDO
    </styles.License>
  );
};
