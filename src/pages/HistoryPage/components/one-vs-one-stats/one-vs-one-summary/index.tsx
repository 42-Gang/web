/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';

import * as styles from './styles.ts';

type OneVsOneSummaryProps = {
  wins: number;
  losses: number;
  css?: Interpolation<Theme>;
};

export const OneVsOneSummary = ({ wins, losses, css }: OneVsOneSummaryProps) => {
  return (
    <styles.summaryContainer css={css}>
      <styles.rateBox labelColor="white" valueColor="yellow">
        <div>WIN</div>
        <div>{wins}</div>
      </styles.rateBox>
      <styles.rateBox labelColor="white" valueColor="yellow">
        <div>LOSE</div>
        <div>{losses}</div>
      </styles.rateBox>
    </styles.summaryContainer>
  );
};
