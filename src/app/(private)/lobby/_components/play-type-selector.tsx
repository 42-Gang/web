import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { BulletIcon } from '~/components/icon';
import { MenuSelector } from '~/components/ui';

export const PlayTypeSelector = () => {
  return (
    <MenuSelector className="gap-6">
      <PlayTypeButton href="?type=auto" text="AUTO" />
      <PlayTypeButton href="?type=custom" text="CUSTOM" />
    </MenuSelector>
  );
};

interface LobbyButtonProps {
  href: string;
  text: string;
}

const PlayTypeButton = ({ href, text }: LobbyButtonProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'group relative w-full rounded-2xl border-2 border-white px-20 py-2',
        'flex items-center justify-center',
        'font-medium text-[28px] text-white leading-snug',
        'hover:border-yellow-300 hover:bg-neutral-50/20 hover:text-yellow-300 active:translate-y-px',
      )}
    >
      <BulletIcon className="-left-[80px] -translate-y-1/2 -translate-x-1 absolute top-1/2 h-9 w-[72.6px] text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
      {text}
    </Link>
  );
};
