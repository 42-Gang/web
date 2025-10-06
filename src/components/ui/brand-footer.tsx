import { twMerge } from 'tailwind-merge';
import { QuinqueFive } from '~/app/_fonts';

export const BrandFooter = () => {
  return (
    <footer
      className={twMerge(
        'mb-10 w-full select-none text-center text-[15px] text-white leading-[1.8] tracking-[0.25rem]',
        QuinqueFive.className,
      )}
    >
      TH & C 1980 1993 NAMCO LTD.
      <br />
      NAMCO HOMETEK, INC.
      <br />
      LICENSED BY NINTENDO
    </footer>
  );
};
