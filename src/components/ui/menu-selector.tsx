import Link from 'next/link';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from '~/app/_fonts';

interface MenuSelectorRootProps extends ComponentProps<'div'> {}

const MenuSelectorRoot = ({ className, ...props }: MenuSelectorRootProps) => {
  return (
    <div className={twMerge('flex flex-col items-center', Tiny.className, className)} {...props} />
  );
};

interface MenuSelectorLinkProps extends ComponentProps<typeof Link> {}

const MenuSelectorLink = ({ className, ...props }: MenuSelectorLinkProps) => {
  return (
    <Link
      className={twMerge(
        'relative w-fit cursor-pointer font-medium text-[32px] text-white leading-snug',
        'before:-left-8 before:-translate-y-1/2 before:absolute before:top-1/2 before:text-2xl before:opacity-0 before:transition-all before:duration-200 before:content-["▶"]',
        'before:translate-x-[-4px] hover:before:translate-x-0 hover:before:opacity-100',
        className,
      )}
      {...props}
    />
  );
};

interface MenuSelectorButtonProps extends ComponentProps<'button'> {}

const MenuSelectorButton = ({ className, ...props }: MenuSelectorButtonProps) => {
  return (
    <button
      className={twMerge(
        'relative w-fit cursor-pointer font-medium text-[32px] text-white leading-snug',
        'before:-left-8 before:-translate-y-1/2 before:absolute before:top-1/2 before:text-2xl before:opacity-0 before:transition-all before:duration-200 before:content-["▶"]',
        'before:translate-x-[-4px] hover:before:translate-x-0 hover:before:opacity-100',
        className,
      )}
      {...props}
    />
  );
};

export const MenuSelector = Object.assign(MenuSelectorRoot, {
  Link: MenuSelectorLink,
  Button: MenuSelectorButton,
});
