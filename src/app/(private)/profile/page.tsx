import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { LogoutButton } from '~/app/(private)/profile/_components/logout-button';
import { ProfileDetail } from '~/app/(private)/profile/_components/profile-detail';
import { CloseButton } from '~/components/ui';

const Page = () => {
  return (
    <>
      <CloseButton />

      <div className="column-center-x h-full">
        <h1 className={twMerge('mt-10 font-bold text-3xl text-white', SuperPixel.className)}>
          Profile
        </h1>

        <div className="mt-10 flex flex-row">
          <Suspense clientOnly={true}>
            <ProfileDetail />
          </Suspense>
        </div>

        <LogoutButton />
      </div>
    </>
  );
};

export default Page;
