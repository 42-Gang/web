import * as styles from './styles.css';

type GameResult = {
  round: string;
  players: string[];
  result: 'WIN' | 'LOSE';
};

type GameRecordProps = {
  records: GameResult[];
};

export const GameRecordList = ({ records }: GameRecordProps) => {
  return (
    <div className={styles.scroll}>
      {records.map((record, index) => (
        <div className={styles.record} key={index}>
          <label className={styles.label}>{record.round}</label>
          <div className={styles.playerList}>
            {record.players.map((player, i) => (
              <p className={styles.playerName} key={i}>
                {player}
              </p>
            ))}
          </div>
          <p className={record.result === 'WIN' ? styles.win : styles.lose}>
            {record.result === 'WIN' ? 'WIN' : 'LOSE'}
          </p>
        </div>
      ))}
    </div>
  );
};
