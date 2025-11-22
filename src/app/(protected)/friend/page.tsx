import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { CloseButton } from '~/components/ui';
import { AddFriendButton } from './_components/add-friend-button';
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
            <Suspense clientOnly>
              <AddFriendButton />
            </Suspense>
            <Suspense>
              <FriendFilterInput />
            </Suspense>
            <Suspense clientOnly>
              <FriendRequestButton />
            </Suspense>
          </div>
        </div>

        <Suspense clientOnly>
          <FriendList />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
