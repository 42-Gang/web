/** @jsxImportSource @emotion/react */
import * as styles from './styles.ts';

type OneVsOneSummaryProps = {
  wins: number | null;
  losses: number | null;
};

export const OneVsOneSummary = ({ wins, losses }: OneVsOneSummaryProps) => {
  return (
    <styles.summaryContainer>
      <RateBox label="WIN" value={wins} labelColor="white" valueColor="yellow" />
      <RateBox label="LOSE" value={losses} labelColor="white" valueColor="yellow" />
    </styles.summaryContainer>
  );
};

const displayValue = (value: number | null | undefined) => {
  if (typeof value !== 'number') return '-';
  if (value < 0) return '-';
  return Math.min(value, 1000000);
};

type RateBoxProps = {
  label: string;
  value: number | null | undefined;
  labelColor: string;
  valueColor: string;
};

const RateBox = ({ label, value, labelColor, valueColor }: RateBoxProps) => {
  const display = displayValue(value);

  return (
    <styles.rateBox labelColor={labelColor} valueColor={valueColor}>
      <div>{label}</div>
      <div>{display}</div>
    </styles.rateBox>
  );
};
