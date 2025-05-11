import * as styles from './styles.css';
import { RateBox } from '../rate-box';

type OneVsOneSummaryProps = {
  wins: number;
  losses: number;
};

export const OneVsOneSummary = ({ wins, losses }: OneVsOneSummaryProps) => {
  return (
    <div className={styles.container}>
      <RateBox label="WIN" value={wins} />
      <RateBox label="LOSE" value={losses} />
    </div>
  );
};
