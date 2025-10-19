'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { TimesIcon } from '~/components/icon';

export const CloseButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        'center absolute top-3 left-3 size-6 cursor-pointer rounded-xs bg-neutral-50/40 text-black',
        'hover:bg-neutral-50/70 active:translate-y-px',
      )}
    >
      <TimesIcon size={20} />
    </button>
  );
};
