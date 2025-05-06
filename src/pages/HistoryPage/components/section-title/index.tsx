/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';

import * as styles from './styles.ts';

type SectionTitleProps = {
  css?: Interpolation<Theme>;
};

export const SectionTitle = ({ css }: SectionTitleProps) => {
  return <styles.Title css={css}>Select game type</styles.Title>;
};
