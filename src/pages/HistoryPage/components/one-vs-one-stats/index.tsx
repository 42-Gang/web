import { useUserInformation } from '@/api';
import { Flex } from '@/components/system/index.ts';

import { GameRecordList } from './game-record-list/index.tsx';
import { OneVsOneSummary } from './game-summary/index.tsx';

export const OneVsOneStats = () => {
  const { data: userData } = useUserInformation();

  const wins = userData?.data?.win ?? null;
  const losses = userData?.data?.lose ?? null;

  return (
    <Flex direction="column">
      <OneVsOneSummary wins={wins} losses={losses} />
      <GameRecordList
        records={[
          { opponent: 'Jungslee', result: 'WIN' },
          { opponent: 'Inryu', result: 'WIN' },
          { opponent: 'Yeeunpar', result: 'WIN' },
          { opponent: 'Hyehan', result: 'LOSE' },
          { opponent: 'Woonshin', result: 'LOSE' },
          { opponent: 'Gyuwon', result: 'WIN' },
          { opponent: 'Hana', result: 'WIN' },
          { opponent: 'Seungbin', result: 'LOSE' },
          { opponent: 'Yeonwoo', result: 'WIN' },
          { opponent: 'Minhyuk', result: 'LOSE' },
        ]}
      />
    </Flex>
  );
};
