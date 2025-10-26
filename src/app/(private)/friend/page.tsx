import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { UsersIcon } from '~/components/icon';
import { CloseButton } from '~/components/ui';
import { AddFriendDialog } from './_components/add-friend-dialog';
import { FriendFilterInput } from './_components/friend-filter-input';
import { FriendList } from './_components/friend-list';
import { FriendRequestButton } from './_components/friend-request-button';

const Page = () => {
  return (
    <>
      <CloseButton />
      <div className="column-center-x h-full">
        <h1 className={twMerge('mt-10 font-bold text-3xl text-white', SuperPixel.className)}>
          Friend List
        </h1>

        <div className="center relative mt-6 w-full">
          <div className="center-y w-[75%] gap-2">
            <AddFriendDialog>
              <button
                className={twMerge(
                  'center size-11 shrink-0 cursor-pointer rounded-2xl border-2 border-neutral-50 text-white',
                  'hover:bg-neutral-50/20 active:translate-y-px',
                )}
                type="button"
              >
                <UsersIcon size={24} />
              </button>
            </AddFriendDialog>
            <Suspense>
              <FriendFilterInput />
            </Suspense>
          </div>

          <Suspense clientOnly>
            <FriendRequestButton />
          </Suspense>
        </div>

        <Suspense clientOnly>
          <FriendList />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
