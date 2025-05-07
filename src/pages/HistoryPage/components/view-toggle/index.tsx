/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';

import * as styles from './styles.ts';

type ViewToggleProps = {
  label: string;
  onClick: () => void;
  isSelected: boolean;
  css?: Interpolation<Theme>;
};

export const ViewToggle = ({ label, onClick, isSelected, css }: ViewToggleProps) => {
  return (
    <styles.Button css={css} onClick={onClick} data-selected={isSelected}>
      <span>{label}</span>
    </styles.Button>
  );
};
