import { twMerge } from 'tailwind-merge';
import type { DuelHistoryItem } from '~/api/types/game';
import { SuperPixel } from '~/app/_fonts';

interface DuelHistoryItemProps {
  item: DuelHistoryItem;
  currentUserId: number;
}

export const DuelHistoryItemComponent = ({ item, currentUserId }: DuelHistoryItemProps) => {
  const isWinner = item.result.winnerId === currentUserId;
  const resultColor = isWinner ? 'text-blue-500' : 'text-red-500';
  const resultText = isWinner ? 'WIN' : 'LOSE';

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between rounded-lg bg-neutral-300 p-4',
        'border border-gray-400 shadow-sm',
      )}
    >
      <div className={twMerge('flex-1')}>
        <span className="font-medium text-2xl text-black">
          {item.player1.nickname} VS {item.player2.nickname}
        </span>
        <span className="ml-2 text-gray-600 text-xl">
          ({item.result.scores.player1}-{item.result.scores.player2})
        </span>
      </div>

      <div className={twMerge('font-bold text-xl', SuperPixel.className, resultColor)}>
        {resultText}
      </div>
    </div>
  );
};
