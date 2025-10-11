import { BrandFooter, BrandTitle, CloseButton } from '~/components/ui';
import { GameTypeSelector } from './_components/game-type-selector';
import { PlayTypeSelector } from './_components/play-type-selector';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { type } = await searchParams;

  return (
    <>
      <CloseButton />
      <div className="column-between h-full">
        <BrandTitle />
        {type ? <GameTypeSelector type={type} /> : <PlayTypeSelector />}
        <BrandFooter />
      </div>
    </>
  );
};

export default Page;
