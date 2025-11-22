import { Suspense } from '@suspensive/react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { CloseButton } from '~/components/ui';
import { LogoutDialog } from './_components/logout-dialog';
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

        <LogoutDialog>
          <button
            type="button"
            className={twMerge(
              'cursor-pointer rounded-4xl border-2 border-white px-10 py-2 text-2xl text-red-800 leading-snug',
              'hover:bg-white active:translate-y-px',
            )}
          >
            <div className="flex gap-6">
              <span>L</span>
              <span>o</span>
              <span>g</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
            </div>
          </button>
        </LogoutDialog>
      </div>
    </>
  );
};

export default Page;
