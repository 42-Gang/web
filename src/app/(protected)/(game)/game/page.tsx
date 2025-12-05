import { ClientComponents } from './client-components';

interface PageProps {
  searchParams: Promise<{
    server: string;
    mid: string;
    playerType: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { server, mid, playerType: _playerType } = await searchParams;
  const playerType = _playerType === 'player1' ? 'player1' : 'player2';

  return <ClientComponents server={server} mid={mid} playerType={playerType} />;
};

export default Page;
