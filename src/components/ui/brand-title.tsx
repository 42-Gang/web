import { type ComponentProps, Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { SuperPixel } from '~/app/_fonts';
import { GunIcon } from '~/components/icon';

interface Props extends ComponentProps<'h1'> {
  showGuns?: boolean;
}

export const BrandTitle = ({ className, showGuns = false, ...props }: Props) => {
  return (
    <div className="relative mt-16 w-full">
      <h1
        className={twMerge(
          'text-center text-6xl text-[hsl(0,48%,59%)] leading-tight',
          SuperPixel.className,
          className,
        )}
        {...props}
      >
        Ping Pong
        <br />
        Gang
      </h1>

      {showGuns && (
        <Fragment>
          <GunIcon className="absolute top-8 left-8 select-none" size={268} />
          <GunIcon className="absolute top-8 right-8 scale-x-[-1] select-none" size={268} />
        </Fragment>
      )}
    </div>
  );
};
