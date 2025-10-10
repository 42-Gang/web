'use client';

import { twMerge } from 'tailwind-merge';
import { useLogout } from '~/api';
import { env } from '~/constants/variables';

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (isPending) return;

    logout(undefined, {
      onSuccess: () => {
        try {
          window.localStorage.removeItem(env.access_token);
        } catch (error) {
          console.warn('Failed to remove item from localStorage:', error);
        }

        window.location.replace('/auth');
      },
      onError: error => {
        console.error('Failed to logout:', error);
        alert('로그아웃에 실패했습니다.');
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={twMerge(
        'cursor-pointer text-3xl text-red-800 tracking-wider hover:bg-white active:translate-y-px',
        'pt-3 pr-10 pb-3 pl-10',
        'rounded-4xl border-2 border-white',
        isPending && 'cursor-not-allowed opacity-50',
      )}
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
