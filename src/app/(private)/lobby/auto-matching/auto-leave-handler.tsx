'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMainGameSocket } from '~/socket';

export const AutoLeaveHandler = () => {
  const socket = useMainGameSocket();
  const searchParams = useSearchParams();
  const _mode = searchParams.get('mode');
  const mode = _mode === '1vs1' || _mode === 'tournament' ? _mode : null;

  // biome-ignore lint/correctness/useExhaustiveDependencies: socket.emit is stable
  useEffect(() => {
    if (!socket.socket || !socket.isConnected || !mode) return;

    return () => {
      if (socket.socket && socket.isConnected) {
        console.log('[lobby/auto-matching] Leaving auto-matching, sending auto-leave event');
        socket.emit('auto-leave', { tournamentSize: mode === 'tournament' ? 4 : 2 });
      }
    };
  }, [socket.socket, socket.isConnected, mode]);

  return null;
};
