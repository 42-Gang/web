import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { BulletIcon } from '~/components/icon';
import { BrandFooter, BrandTitle, MenuSelector } from '~/components/ui';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      <MenuSelector className="gap-6">
        <LobbyButton href="#" text="AUTO" />
        <LobbyButton href="#" text="CUSTOM" />
      </MenuSelector>

      <BrandFooter />
    </div>
  );
};

interface LobbyButtonProps {
  href: string;
  text: string;
}

const LobbyButton = ({ href, text }: LobbyButtonProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'group relative w-full rounded-2xl border-2 border-white px-20 py-2',
        'flex items-center justify-center',
        'font-medium text-[28px] text-white leading-snug',
        'hover:bg-neutral-50/20 hover:text-yellow-300',
      )}
    >
      <BulletIcon className="-left-[80px] -translate-y-1/2 -translate-x-1 absolute top-1/2 h-9 w-[72.6px] text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
      {text}
    </Link>
  );
};

export default Page;
