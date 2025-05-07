import { useEffect, useRef } from 'react';
import type { Socket } from 'socket.io-client';

import { getSocket } from './createSocket';

export const useSocket = <T extends Record<string, (...args: unknown[]) => void>>(
  path: string,
  events: {
    on?: Partial<T>;
  } = {},
) => {
  const socketRef = useRef<Socket | null>(null);
  const handlersRef = useRef(events.on);

  useEffect(() => {
    const socket = getSocket(path);
    socketRef.current = socket;

    if (!socket.connected) {
      socket.connect();
    }

    const handlers = handlersRef.current;
    if (handlers) {
      (Object.entries(handlers) as [keyof T, T[keyof T]][]).forEach(([event, handler]) => {
        socket.on(event as string, handler);
      });
    }

    return () => {
      if (handlers) {
        Object.keys(handlers).forEach((event) => {
          socket.off(event);
        });
      }
      socket.disconnect();
    };
  }, [path]);

  return socketRef.current!;
};
