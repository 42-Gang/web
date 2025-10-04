import { BrandFooter, BrandTitle } from '~/components/ui';
import { WaitingText } from './waiting-text';

interface Props {
  searchParams: Promise<{ code: string; state: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { code, state } = await searchParams;

  return (
    <div className="column-between h-full">
      <BrandTitle />

      <WaitingText />

      <BrandFooter />
    </div>
  );
};

export default Page;
