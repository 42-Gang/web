'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import { TimesIcon } from '~/components/icon';

interface CloseButtonProps extends ComponentProps<'button'> {}

export const CloseButton = ({ onClick, className, ...props }: CloseButtonProps) => {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (onClick) {
      onClick(e);
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        'center absolute top-3 left-3 size-6 cursor-pointer rounded-xs bg-neutral-50/40 text-black',
        'hover:bg-neutral-50/70 active:translate-y-px',
        className,
      )}
      {...props}
    >
      <TimesIcon size={20} />
    </button>
  );
};
