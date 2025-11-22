'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMainGameSocket } from '~/socket';

export const CustomLeaveHandler = () => {
  const socket = useMainGameSocket();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!socket.socket || !socket.isConnected || !id) return;

    return () => {
      if (socket.socket && socket.isConnected) {
        console.log('[lobby/custom-matching] Leaving custom-matching, sending custom-leave event');
        socket.emit('custom-leave', { roomId: id });
      }
    };
  }, [socket.socket, socket.isConnected, socket.emit, id]);

  return null;
};
