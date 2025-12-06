'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMainGameSocket } from '~/socket';

export const CustomLeaveHandler = () => {
  const socket = useMainGameSocket();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!socket.socket || !id) return;

    return () => {
      socket.emit('custom-leave', { roomId: id });
      console.log('[leave] Leaving room:', id);
    };
  }, [socket.socket, socket.emit, id]);

  return null;
};
