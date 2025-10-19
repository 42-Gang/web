import { notFound } from 'next/navigation';
import { CloseButton } from '~/components/ui';
import { Heading } from '../_components/heading';
import { ClientComponent } from './client-component';

export type MatchingMode = '1vs1' | 'tournament';

interface Props {
  searchParams: Promise<{ mode: MatchingMode }>;
}

const Page = async ({ searchParams }: Props) => {
  const { mode: _mode } = await searchParams;
  const mode: MatchingMode | null = isValidMode(_mode) ? _mode : null;

  if (!mode) notFound();

  return (
    <>
      <CloseButton />
      <div className="column-between h-full">
        <Heading>AUTO {mode === '1vs1' ? 'SOLO' : 'TOURNAMENT'}</Heading>
        <ClientComponent mode={mode} />
      </div>
    </>
  );
};

export default Page;

const isValidMode = (value: unknown): value is MatchingMode =>
  value === '1vs1' || value === 'tournament';
