import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { CloseButton } from '~/components/ui';
import { HistoryContent } from './_components/history-content';

const Page = () => {
  return (
    <>
      <CloseButton />
      <div className="column-center-x h-full gap-6 p-6">
        <h1 className={twMerge('font-bold text-3xl text-white', SuperPixel.className)}>
          SELECT GAME TYPE
        </h1>

        <Suspense clientOnly>
          <HistoryContent />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
