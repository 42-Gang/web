/** @jsxImportSource @emotion/react */
import * as styles from './styles.ts';

type TournamentSummaryProps = {
  tournament: number | null;
};

export const TournamentSummary = ({ tournament }: TournamentSummaryProps) => {
  return (
    <styles.summaryContainer>
      <RateBox label="Total Wins" value={tournament} labelColor="white" valueColor="yellow" />
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
