import { twMerge } from 'tailwind-merge';
import type { DuelHistoryItem } from '~/api/types/game';
import { SuperPixel } from '~/app/_fonts';

interface DuelHistoryItemProps {
  item: DuelHistoryItem;
  currentUserId: number;
}

export const DuelItem = ({ item, currentUserId }: DuelHistoryItemProps) => {
  const isWinner = item.result.winnerId === currentUserId;

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between rounded-lg bg-neutral-300 px-4 py-3',
        'border border-gray-400 shadow-sm',
      )}
    >
      <div className="flex-1">
        <span className="font-medium text-2xl text-black">
          {item.player1.nickname} VS {item.player2.nickname}
        </span>
        <span className="ml-2 text-gray-600 text-xl">
          ({item.result.scores.player1}-{item.result.scores.player2})
        </span>
      </div>

      <div
        className={twMerge(
          'font-bold text-xl',
          isWinner ? 'text-blue-500' : 'text-red-500',
          SuperPixel.className,
        )}
      >
        {isWinner ? 'WIN' : 'LOSE'}
      </div>
    </div>
  );
};
