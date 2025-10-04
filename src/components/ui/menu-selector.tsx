import Link from 'next/link';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { QuinqueFive } from '~/app/_fonts';

interface MenuSelectorRootProps extends ComponentProps<'div'> {}

const MenuSelectorRoot = ({ className, ...props }: MenuSelectorRootProps) => {
  return <div className={twMerge('column gap-2', QuinqueFive.className, className)} {...props} />;
};

interface MenuSelectorLinkProps extends ComponentProps<typeof Link> {}

const MenuSelectorLink = ({ className, ...props }: MenuSelectorLinkProps) => {
  return (
    <Link className={twMerge('-tracking-[0.1rem] text-white text-xl', className)} {...props} />
  );
};

export const MenuSelector = Object.assign(MenuSelectorRoot, {
  Link: MenuSelectorLink,
});
