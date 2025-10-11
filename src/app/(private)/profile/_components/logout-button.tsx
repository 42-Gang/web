'use client';

import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { LogoutDialog } from './logout-dialog';

interface Props extends ComponentProps<'button'> {}

export const LogoutButton = ({ className, ...props }: Props) => {
  return (
    <LogoutDialog>
      <button
        type="button"
        className={twMerge(
          'cursor-pointer rounded-4xl border-2 border-white px-10 py-2 text-2xl text-red-800 leading-snug',
          'hover:bg-white active:translate-y-px',
          className,
        )}
        {...props}
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
  );
};
