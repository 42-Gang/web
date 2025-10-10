import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { MenuSelector } from '~/components/ui';
import { routes } from '~/constants/routes';

interface GameTypeSelectorProps {
  type: string;
}

export const GameTypeSelector = ({ type }: GameTypeSelectorProps) => {
  const prefix = type === 'auto' ? routes.lobby_auto : routes.lobby_custom;

  return (
    <MenuSelector className="flex-row gap-6">
      <Link
        href={`/${prefix}?mode=1vs1`}
        className={twMerge(
          'column-between size-[200px] select-none rounded-2xl border-2 border-white p-3',
          'hover:border-yellow-300 hover:bg-neutral-50/20 hover:text-yellow-300',
        )}
      >
        <Image
          src="/assets/icon_type_1vs1.png"
          alt="1vs1"
          width={150}
          height={140}
          draggable={false}
        />
        <span className="font-medium text-2xl">1VS1</span>
      </Link>
      <Link
        href={`/${prefix}?mode=tournament`}
        className={twMerge(
          'column-between size-[200px] select-none rounded-2xl border-2 border-white p-3',
          'hover:border-yellow-300 hover:bg-neutral-50/20 hover:text-yellow-300',
        )}
      >
        <Image
          src="/assets/icon_type_tournament.png"
          alt="1vs1"
          width={150}
          height={140}
          draggable={false}
        />
        <span className="font-medium text-2xl">TOURNAMENT</span>
      </Link>
    </MenuSelector>
  );
};
