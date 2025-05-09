import { useEffect, useCallback } from 'react';

import { useAuthAtom } from '@/atoms/useAuthAtom';

import { createSocket } from './createSocket';

interface UseSocketOptions {
  path: string;
  handshake: string;
  withToken?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useSocket = (options: UseSocketOptions) => {
  const { token } = useAuthAtom();
  const { path, handshake, withToken = true, onConnect, onDisconnect, onError } = options;

  const socket = createSocket(path, withToken && token ? token : undefined, {
    handshake,
    withToken,
  });

  const connect = useCallback(() => {
    socket.connect();
  }, [socket]);

  const disconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    if (onConnect) {
      socket.on('connect', onConnect);
    }

    if (onDisconnect) {
      socket.on('disconnect', onDisconnect);
    }

    if (onError) {
      socket.on('error', onError);
      socket.on('connect_error', onError);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('error', onError);
      socket.off('connect_error', onError);
    };
  }, [socket, onConnect, onDisconnect, onError]);

  return {
    socket,
    connect,
    disconnect,
    isConnected: socket.connected,
  };
};
