import { notFound } from 'next/navigation';
import { CloseButton } from '~/components/ui';
import { Heading } from '../../_components/heading';
import { isValidMode, type MatchingMode } from '../../_types';
import { ClientComponent } from './client-component';

interface Props {
  searchParams: Promise<{
    id?: string;
    isHost?: string;
    mode: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const { id: _id, mode: _mode, isHost: _isHost } = await searchParams;
  const mode: MatchingMode | null = isValidMode(_mode) ? _mode : null;

  if (!mode) notFound();

  const id = typeof _id === 'string' && _id.length > 0 ? _id : null;
  const isHost = _isHost === 'true';

  return (
    <>
      <CloseButton />

      <div className="column-between h-full">
        <Heading>CUSTOM {mode === '1vs1' ? 'SOLO' : 'TOURNAMENT'}</Heading>
        <ClientComponent id={id} mode={mode} isHost={isHost} />
      </div>
    </>
  );
};

export default Page;
