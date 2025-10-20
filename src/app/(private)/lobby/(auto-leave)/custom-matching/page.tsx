import { notFound } from 'next/navigation';
import { CloseButton, WaitingText } from '~/components/ui';
import { Heading } from '../../_components/heading';

interface Props {
  searchParams: Promise<{ mode: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { mode } = await searchParams;
  if (!mode) notFound();

  return (
    <>
      <CloseButton />
      <div className="column-between h-full">
        <Heading>CUSTOM {mode === '1vs1' ? 'SOLO' : 'TOURNAMENT'}</Heading>
        <WaitingText className="mb-10 text-[#D2F474]" prefix="Invite your friend" />
      </div>
    </>
  );
};

export default Page;
