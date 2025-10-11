'use client';

import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLogout } from '~/api';
import { extractErrorData, removeAccessToken } from '~/api/base';
import { routes } from '~/constants/routes';

interface Props extends ComponentProps<'button'> {}

export const LogoutButton = ({ className, ...props }: Props) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (isPending) return;

    logout(undefined, {
      onSuccess: async () => {
        removeAccessToken();
        window.location.replace(`/${routes.auth}`);
      },
      onError: async error => {
        console.error('Failed to logout:', error);
        const errorData = await extractErrorData(error);
        alert(errorData?.message || '로그아웃에 실패했습니다.');
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={twMerge(
        'cursor-pointer rounded-4xl border-2 border-white px-10 py-2 text-2xl text-red-800 leading-snug',
        'hover:bg-white active:translate-y-px',
        isPending && 'cursor-not-allowed opacity-40',
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
  );
};
