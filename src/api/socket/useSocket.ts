import { useEffect, useState, useCallback, useRef } from 'react';

import { refreshAccessToken } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';

import { createSocket, destroySocket, SocketOptions } from './socketManager';

interface UseSocketOptions extends SocketOptions {
  path: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useSocket = (options: UseSocketOptions) => {
  const { path, handshake, withToken = true, onConnect, onDisconnect, onError } = options;
  const { token, setToken } = useAuthAtom();

  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(() =>
    createSocket(path, token || '', { handshake, withToken }),
  );

  const retryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const callbacksRef = useRef({ onConnect, onDisconnect, onError });
  callbacksRef.current = { onConnect, onDisconnect, onError };

  const handlersRef = useRef({
    handleConnect: () => {
      setIsConnected(true);
      if (retryTimerRef.current) {
        clearInterval(retryTimerRef.current);
        retryTimerRef.current = null;
      }
      callbacksRef.current.onConnect?.();
    },
    handleDisconnect: () => {
      setIsConnected(false);
      callbacksRef.current.onDisconnect?.();
    },
    handleConnectError: async (error: Error) => {
      console.warn('connect_error:', error);

      const newToken = await refreshAccessToken().catch(() => null);
      if (newToken) {
        setToken(newToken);
        destroySocket(path, token ?? undefined, { handshake, withToken });
        const newSocket = createSocket(path, newToken, { handshake, withToken });
        setSocket(newSocket);
        newSocket.connect();
      }

      if (!retryTimerRef.current) {
        retryTimerRef.current = setInterval(() => {
          socket.connect();
        }, 1000);
      }

      callbacksRef.current.onError?.(error);
    },
  });

  const connect = useCallback(() => {
    socket.connect();
  }, [socket]);

  const disconnect = useCallback(() => {
    socket.disconnect();
    if (retryTimerRef.current) {
      clearInterval(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, [socket]);

  useEffect(() => {
    const { handleConnect, handleDisconnect, handleConnectError } = handlersRef.current;

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      if (retryTimerRef.current) {
        clearInterval(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [socket]);

  return { socket, connect, disconnect, isConnected };
};
