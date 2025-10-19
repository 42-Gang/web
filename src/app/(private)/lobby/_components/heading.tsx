import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from '~/app/_fonts';

interface Props extends ComponentProps<'h1'> {}

export const Heading = ({ className, ...props }: Props) => {
  return (
    <h1 className={twMerge('mt-10 font-bold text-[52px]', Tiny.className, className)} {...props} />
  );
};
