import { notFound } from 'next/navigation';
import { CloseButton } from '~/components/ui';
import { Heading } from '../../_components/heading';
import { isValidMode, type MatchingMode } from '../../_types';
import { ClientComponent } from './client-component';

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
