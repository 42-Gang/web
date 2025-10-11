'use client';

import { useQueryState } from 'nuqs';
import { twMerge } from 'tailwind-merge';
import { Tiny } from '~/app/_fonts';
import { CTAButton } from '~/components/ui';

const HistoryGameTypeSelector = () => {
  const [gameType, setGameType] = useQueryState('type', { defaultValue: 'duel' });

  return (
    <div className={twMerge('flex gap-4 text-2xl', Tiny.className)}>
      <CTAButton size="lg" onClick={() => setGameType('duel')} isActive={gameType === 'duel'}>
        1 vs 1
      </CTAButton>

      <CTAButton
        size="lg"
        onClick={() => setGameType('tournament')}
        isActive={gameType === 'tournament'}
      >
        Tournament
      </CTAButton>
    </div>
  );
};

export { HistoryGameTypeSelector };
