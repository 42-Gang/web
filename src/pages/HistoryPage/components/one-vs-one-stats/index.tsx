import { useUserInformation } from '@/api/queries/useUserInformation.ts';

import { OneVsOneSummary } from './one-vs-one-summary/index.tsx';

export const OneVsOneStats = () => {
  const { data, isLoading, isError } = useUserInformation();

  if (isLoading) return <p>Loading</p>;
  if (isError || !data || !data.data) return <p>No data</p>;

  return <OneVsOneSummary wins={data.data.win} losses={data.data.lose} />;
};
