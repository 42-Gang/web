'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from '~/app/_fonts';

interface Props extends ComponentProps<'p'> {
  prefix?: string;
}

export const WaitingText = ({ prefix = 'Waiting', className, ...props }: Props) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className={twMerge('font-medium text-4xl', Tiny.className, className)} {...props}>
      {prefix}
      {'.'.repeat(dotCount)}
    </p>
  );
};
