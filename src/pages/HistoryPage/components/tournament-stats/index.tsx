import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';

import { GameRecordList } from './game-record-list';
import { TournamentSummary } from './game-summary';

export const TournamentStats = () => {
  const { data } = useUsersMe();

  const tournament = data?.data?.tournament ?? null;

  return (
    <Flex direction="column" alignItems="center">
      <TournamentSummary tournament={tournament} />
      <GameRecordList
        records={[
          {
            round: 'Round16',
            players: ['Alice', 'Bob', 'Charlie', 'Dave'],
            result: 'WIN',
          },
          {
            round: 'Round8',
            players: ['Eve', 'Frank', 'Grace', 'Heidi'],
            result: 'WIN',
          },
          {
            round: 'Round8',
            players: ['Ivan', 'Judy', 'Mallory', 'Niaj'],
            result: 'LOSE',
          },
          {
            round: 'Round4',
            players: ['Oscar', 'Peggy', 'Sybil', 'Trent'],
            result: 'WIN',
          },
          {
            round: 'Round4',
            players: ['Victor', 'Walter', 'Xavier', 'Yasmine'],
            result: 'LOSE',
          },
          {
            round: 'Round2',
            players: ['Zoe', 'Anna', 'Ben', 'Carl'],
            result: 'WIN',
          },
          {
            round: 'Round2',
            players: ['Dina', 'Eli', 'Finn', 'Gina'],
            result: 'LOSE',
          },
          {
            round: 'Final',
            players: ['Hero', 'Ivy', 'Jack', 'Kara'],
            result: 'WIN',
          },
          {
            round: 'Final',
            players: ['Liam', 'Mia', 'Nora', 'Owen'],
            result: 'LOSE',
          },
          {
            round: 'Final',
            players: ['Paul', 'Quinn', 'Rita', 'Steve'],
            result: 'WIN',
          },
        ]}
      />
    </Flex>
  );
};
