import { twMerge } from 'tailwind-merge';
import type { TournamentHistoryItem } from '~/api/types/game';
import { SuperPixel } from '~/app/_fonts';

interface Props {
  item: TournamentHistoryItem;
}

export const TournamentItem = ({ item }: Props) => {
  const isWinner = item.myResult === 'WIN';

  return (
    <div
      className={twMerge(
        'flex w-full items-start justify-between rounded-lg bg-neutral-300 px-4 py-3',
        'border border-gray-400 shadow-sm',
        SuperPixel.className,
      )}
    >
      <div className="flex-1">
        <div className="mb-2 font-medium text-black text-lg">Round{item.rounds}</div>
        <div className="flex flex-col gap-1">
          {item.participants.map(participant => (
            <div key={participant.id} className="text-gray-700 text-sm">
              {participant.nickname}
            </div>
          ))}
        </div>
      </div>

      <div className={twMerge('font-bold text-xl', isWinner ? 'text-blue-500' : 'text-red-500')}>
        {item.myResult}
      </div>
    </div>
  );
};
