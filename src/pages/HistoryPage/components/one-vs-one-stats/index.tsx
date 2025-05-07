import { useUserInformation } from '@/api/queries/useUserInformation.ts';

import { OneVsOneSummary } from './one-vs-one-summary/index.tsx';

export const OneVsOneStats = () => {
  const { data, isLoading, isError } = useUserInformation();

  if (isLoading) return <p>Loading</p>;
  if (isError || !data) return <p>No data</p>;

  return <OneVsOneSummary wins={data.win} losses={data.lose} />;
};
