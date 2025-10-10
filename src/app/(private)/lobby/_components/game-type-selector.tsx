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
    <div className="flex flex-col gap-6">
      <MenuSelector className="flex-row gap-6">
        <GameModeLink href={`/${prefix}?mode=1vs1`} src="/assets/icon_type_1vs1.png" label="1VS1" />
        <GameModeLink
          href={`/${prefix}?mode=tournament`}
          src="/assets/icon_type_tournament.png"
          label="TOURNAMENT"
        />
      </MenuSelector>
    </div>
  );
};

interface GameModeLinkProps {
  href: string;
  src: string;
  label: string;
  width?: number;
  height?: number;
}

export const GameModeLink = ({
  href,
  src,
  label,
  width = 140,
  height = 131,
}: GameModeLinkProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'column-between size-[196px] select-none rounded-2xl border-2 border-white p-3',
        'hover:border-yellow-300 hover:bg-neutral-50/20 hover:text-yellow-300 active:translate-y-px',
      )}
    >
      <Image src={src} alt={label} width={width} height={height} draggable={false} />
      <span className="font-medium text-2xl">{label}</span>
    </Link>
  );
};
