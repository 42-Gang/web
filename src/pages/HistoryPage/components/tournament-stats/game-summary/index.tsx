import * as styles from './styles.css';
import { RateBox } from '../../rate-box';

type TournamentSummaryProps = {
  tournament: number;
};

export const TournamentSummary = ({ tournament }: TournamentSummaryProps) => {
  return (
    <div className={styles.summary}>
      <RateBox label="Total Wins" value={tournament} />
    </div>
  );
};
