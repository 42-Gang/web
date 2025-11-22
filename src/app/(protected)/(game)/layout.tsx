import type { PropsWithChildren } from 'react';
import { TournamentSocketProvider } from './tournament-socket-provider';

const RootLayout = ({ children }: PropsWithChildren) => {
  return <TournamentSocketProvider>{children}</TournamentSocketProvider>;
};

export default RootLayout;
