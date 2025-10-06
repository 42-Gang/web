import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { UserPlusIcon } from '~/components/icon';
import { CloseButton } from '~/components/ui';

const Page = () => {
  return (
    <>
      <CloseButton />
      <div className="column-center-x">
        <h1 className={twMerge('mt-10 font-bold text-3xl text-white', SuperPixel.className)}>
          Friend List
        </h1>

        <div className="center-y mt-6 w-[75%] gap-2">
          <button
            className={twMerge(
              'cursor-pointer rounded-2xl border-2 border-white p-1.5 text-white',
              'hover:bg-white/20 active:translate-y-px',
            )}
            type="button"
          >
            <UserPlusIcon size={28} />
          </button>
          <input className="h-11 w-full rounded-xl bg-white" />
        </div>
      </div>
    </>
  );
};

export default Page;
