'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const CloseButton = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <button
      className={twMerge(
        'center absolute top-3 left-3 size-6 cursor-pointer rounded-xs bg-neutral-50/40 text-black',
        'hover:bg-neutral-50/70 active:translate-y-px',
      )}
      type="button"
      onClick={handleClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
};
