import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';

export const ProfileHeader = () => {
  return (
    <h1 className={twMerge('mt-10 font-bold text-3xl text-white', SuperPixel.className)}>
      Profile
    </h1>
  );
};
