import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { CloseButton } from '~/components/ui';

const Page = () => {
  return (
    <>
      <CloseButton />
      <div className="column-center-x h-full">
        <h1 className={twMerge('mt-10 font-bold text-3xl text-white', SuperPixel.className)}>
          History
        </h1>
      </div>
    </>
  );
};

export default Page;
