import { useEffect, useCallback, useState } from 'react';

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

  const [isConnected, setIsConnected] = useState(socket.connected);

  const connect = useCallback(() => {
    socket.connect();
  }, [socket]);

  const disconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      onConnect?.();
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      onDisconnect?.();
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    if (onError) {
      socket.on('error', onError);
      socket.on('connect_error', onError);
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', onError);
      socket.off('connect_error', onError);
    };
  }, [socket, onConnect, onDisconnect, onError]);

  return {
    socket,
    connect,
    disconnect,
    isConnected,
  };
};
