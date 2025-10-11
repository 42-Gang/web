import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { CloseButton } from '~/components/ui';
import { LogoutButton } from './_components/logout-button';
import { ProfileDetail } from './_components/profile-detail';

const Page = () => {
  return (
    <>
      <CloseButton />

      <div className="column-between h-full py-10">
        <h1 className={twMerge('font-bold text-3xl text-white', SuperPixel.className)}>Profile</h1>

        <Suspense clientOnly>
          <ProfileDetail />
        </Suspense>

        <LogoutButton />
      </div>
    </>
  );
};

export default Page;
