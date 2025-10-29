'use client';

import { useSocket } from '~/socket';

interface ClientComponentsProps {
  tid: string;
}
export const ClientComponents = ({ tid }: ClientComponentsProps) => {
  const { socket } = useSocket({
    path: '/ws/main-game',
    namespace: '/tournament',
    withAuth: true,
    query: { tournamentId: tid },
  });

  return <></>;
};
