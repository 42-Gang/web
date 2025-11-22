'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { queryKeys } from '~/api/queryKey';
import { EditNicknameButton } from './edit-nickname-button';
import { NicknameEditModal } from './nickname-edit-modal';

interface ProfileStatsProps {
  userId: number;
  nickname: string;
}

export const ProfileStats = ({ userId, nickname }: ProfileStatsProps) => {
  const [{ data: _duel }, { data: _tournament }] = useSuspenseQueries({
    queries: [
      queryKeys.games.stats({ userId, mode: 'duel' }),
      queryKeys.games.stats({ userId, mode: 'tournament' }),
    ],
  });
  const duel = _duel.data;
  const tournament = _tournament.data;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ul className="column gap-4 text-3xl text-white">
        <li className="center-y">
          Nickname :&nbsp;<span className="text-yellow-300">{nickname}</span>
          <EditNicknameButton className="ml-2" onClick={() => setIsOpen(true)} />
        </li>
        <li>WIN : {duel.summary.wins}</li>
        <li>LOSE : {duel.summary.losses}</li>
        <li>Tournament : {tournament.summary.wins}</li>
      </ul>

      <NicknameEditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialNickname={nickname}
      />
    </>
  );
};
