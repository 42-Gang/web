import { notFound } from 'next/navigation';
import { CloseButton } from '~/components/ui';
import { Heading } from '../_components/heading';
import { Client } from './client';

export type MatchingMode = '1vs1' | 'tournament';

interface Props {
  searchParams: Promise<{ mode: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { mode: _mode } = await searchParams;
  const mode: MatchingMode = isValidMode(_mode) ? _mode : notFound();

  return (
    <>
      <CloseButton />
      <div className="column-between h-full">
        <Heading>AUTO {mode === '1vs1' ? 'SOLO' : 'TOURNAMENT'}</Heading>
        <Client mode={mode} />
      </div>
    </>
  );
};

export default Page;

const isValidMode = (value: unknown): value is MatchingMode =>
  value === '1vs1' || value === 'tournament';
