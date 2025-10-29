import { CloseButton } from '~/components/ui';
import { ClientComponents } from './client-components';

interface PageProps {
  searchParams: Promise<{ tid: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { tid } = await searchParams;

  return (
    <>
      <CloseButton />

      <ClientComponents tid={tid} />
    </>
  );
};

export default Page;
