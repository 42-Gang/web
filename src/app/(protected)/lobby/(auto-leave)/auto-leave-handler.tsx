'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMainGameSocket } from '~/socket';

export const AutoLeaveHandler = () => {
  const socket = useMainGameSocket();
  const searchParams = useSearchParams();
  const _mode = searchParams.get('mode');
  const mode = _mode === '1vs1' || _mode === 'tournament' ? _mode : null;

  useEffect(() => {
    if (!socket.socket || !mode) return;

    return () => {
      socket.emit('auto-leave', { tournamentSize: mode === 'tournament' ? 4 : 2 });
      console.log('[leave] Leaving queue:', mode);
    };
  }, [socket.socket, socket.emit, mode]);

  return null;
};
