import { twMerge } from 'tailwind-merge';
import type { DuelHistoryItem, TournamentHistoryItem } from '~/api/types/game';
import { DuelHistoryItemComponent } from './duel-history-item';
import { TournamentHistoryItemComponent } from './tournament-history-item';

interface HistoryListProps {
  gameType: string;
  history: (DuelHistoryItem | TournamentHistoryItem)[];
  filter: string;
  currentUserId: number;
}

const HistoryList = ({ gameType, history, filter, currentUserId }: HistoryListProps) => {
  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;

    if (gameType === 'duel') {
      const duelItem = item as DuelHistoryItem;
      const isWinner = duelItem.result.winnerId === currentUserId;
      return filter === 'win' ? isWinner : !isWinner;
    }
    const tournamentItem = item as TournamentHistoryItem;
    return filter === 'win'
      ? tournamentItem.myResult === 'WIN'
      : tournamentItem.myResult === 'LOSS';
  });

  if (filteredHistory.length === 0) {
    return <div className={twMerge('py-8 text-center text-gray-400 text-lg')}>No games found</div>;
  }

  return (
    <div className="max-h-96 w-full max-w-2xl space-y-3 overflow-y-auto">
      {filteredHistory.map(item => {
        if (gameType === 'duel') {
          const duelItem = item as DuelHistoryItem;
          return (
            <DuelHistoryItemComponent
              key={`duel-${duelItem.tournamentId}`}
              item={item as DuelHistoryItem}
              currentUserId={currentUserId}
            />
          );
        }
        const tournamentItem = item as TournamentHistoryItem;
        return (
          <TournamentHistoryItemComponent
            key={`tournament-${tournamentItem.tournamentId}`}
            item={item as TournamentHistoryItem}
            currentUserId={currentUserId}
          />
        );
      })}
    </div>
  );
};

export { HistoryList };
