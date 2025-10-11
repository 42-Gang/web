import { useQueryState } from 'nuqs';
import { twMerge } from 'tailwind-merge';
import { Tiny } from '~/app/_fonts';
import { CTAButton } from '~/components/ui';

export const HistoryGameTypeSelector = () => {
  const [gameType, setGameType] = useQueryState('type', { defaultValue: 'duel' });

  return (
    <div className={twMerge('flex gap-4 text-2xl', Tiny.className)}>
      <CTAButton onClick={() => setGameType('duel')} aria-selected={gameType === 'duel'}>
        1 vs 1
      </CTAButton>

      <CTAButton
        onClick={() => setGameType('tournament')}
        aria-selected={gameType === 'tournament'}
      >
        Tournament
      </CTAButton>
    </div>
  );
};
