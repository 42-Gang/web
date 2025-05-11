/** @jsxImportSource @emotion/react */
import * as styles from './styles.ts';

type GameResult = {
  opponent: string;
  result: 'WIN' | 'LOSE';
};

type GameRecordProps = {
  records: GameResult[];
};

export const GameRecordList = ({ records }: GameRecordProps) => {
  return (
    <styles.RecordListContainer>
      {records.map((record, index) => (
        <styles.RecordItem key={index}>
          <styles.PlayerText>{record.opponent} VS PONG</styles.PlayerText>
          <styles.ResultText result={record.result}>
            {record.result === 'WIN' ? 'WIN' : 'LOSE'}
          </styles.ResultText>
        </styles.RecordItem>
      ))}
    </styles.RecordListContainer>
  );
};
