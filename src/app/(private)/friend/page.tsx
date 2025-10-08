import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { UserPlusIcon } from '~/components/icon';
import { CloseButton } from '~/components/ui';
import { FriendList } from './_components/friend-list';

const Page = () => {
  return (
    <>
      <CloseButton />
      <div className="column-center-x h-full">
        <h1 className={twMerge('mt-10 font-bold text-3xl text-white', SuperPixel.className)}>
          Friend List
        </h1>

        <div className="center-y mt-6 w-[75%] gap-2">
          <button
            className={twMerge(
              'center size-11 shrink-0 cursor-pointer rounded-2xl border-2 border-neutral-50 text-white',
              'hover:bg-neutral-50/20 active:translate-y-px',
            )}
            type="button"
          >
            <UserPlusIcon size={24} />
          </button>
          <input className="h-11 w-full rounded-xl bg-white px-4" />
        </div>

        <Suspense clientOnly>
          <FriendList />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
