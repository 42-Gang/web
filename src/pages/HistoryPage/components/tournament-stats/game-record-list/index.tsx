/** @jsxImportSource @emotion/react */
import * as styles from './styles.ts';

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
    <styles.ScrollContainer>
      {records.map((record, index) => (
        <styles.RecordItem key={index}>
          <styles.RoundLabel>{record.round}</styles.RoundLabel>
          <styles.PlayerList>
            {record.players.map((player, i) => (
              <styles.PlayerName key={i}>{player}</styles.PlayerName>
            ))}
          </styles.PlayerList>
          <styles.ResultText result={record.result}>
            {record.result === 'WIN' ? 'WIN' : 'LOSE'}
          </styles.ResultText>
        </styles.RecordItem>
      ))}
    </styles.ScrollContainer>
  );
};
