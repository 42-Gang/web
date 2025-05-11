import { useUsersMe } from '@/api';

import { OneVsOneSummary } from './one-vs-one-summary/index.tsx';

export const OneVsOneStats = () => {
  const { data } = useUsersMe();

  const wins = data?.data?.win ?? null;
  const losses = data?.data?.lose ?? null;

  return <OneVsOneSummary wins={wins} losses={losses} />;
};
