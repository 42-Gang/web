import * as styles from './styles.css';

type GameResult = {
  opponent: string;
  result: 'WIN' | 'LOSE';
};

type GameRecordListProps = {
  records: GameResult[];
};

export const GameRecordList = ({ records }: GameRecordListProps) => {
  return (
    <ul className={styles.list}>
      {records.map((record, index) => (
        <li key={index} className={styles.item}>
          <p className={styles.player}>{record.opponent} VS PONG</p>
          <p className={record.result === 'WIN' ? styles.win : styles.lose}>
            {record.result === 'WIN' ? 'WIN' : 'LOSE'}
          </p>
        </li>
      ))}
    </ul>
  );
};
