import { useCallback, useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '../base/socket-events';
import { createSocket, destroySocket, type SocketOptions } from '../base/socket-manager';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface UseSocketOptions extends SocketOptions {
  autoConnect?: boolean;
  autoDisconnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
  onError?: (error: Error) => void;
}

export interface UseSocketReturn {
  socket: SocketInstance | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  connect: () => void;
  disconnect: () => void;
  emit: <K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0],
  ) => void;
  on: <K extends keyof ServerToClientEvents>(
    event: K,
    handler: ServerToClientEvents[K],
  ) => () => void;
}

export const useSocket = (options: UseSocketOptions): UseSocketReturn => {
  const [socket, setSocket] = useState<SocketInstance | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const optionsRef = useRef(options);
  const handlersRef = useRef({
    onConnect: options.onConnect,
    onDisconnect: options.onDisconnect,
    onError: options.onError,
  });
  const mountedRef = useRef(true);

  useEffect(() => {
    optionsRef.current = options;
    handlersRef.current = {
      onConnect: options.onConnect,
      onDisconnect: options.onDisconnect,
      onError: options.onError,
    };
  }, [options]);

  const setupSocketHandlers = useCallback((sock: SocketInstance) => {
    sock.on('connect', () => {
      if (mountedRef.current) {
        setIsConnected(true);
        setIsConnecting(false);
        handlersRef.current.onConnect?.();
      }
    });

    sock.on('disconnect', reason => {
      if (mountedRef.current) {
        setIsConnected(false);
        setIsConnecting(false);
        handlersRef.current.onDisconnect?.(reason);
      }
    });

    sock.on('connect_error', err => {
      if (mountedRef.current) {
        setError(err as Error);
        setIsConnecting(false);
        handlersRef.current.onError?.(err as Error);
      }
    });
  }, []);

  const recreateSocket = useCallback(
    async (newToken: string) => {
      console.log('[use-socket] Recreating socket with new token');

      if (!mountedRef.current) return;

      const namespace = optionsRef.current.namespace || '/';
      const withAuth = optionsRef.current.withAuth !== false;

      destroySocket(namespace, withAuth, optionsRef.current.query);

      const newOptions = {
        ...optionsRef.current,
        query: { ...optionsRef.current.query, token: newToken },
      };

      const newSocket = await createSocket(newOptions, recreateSocket);

      if (!mountedRef.current) {
        newSocket.disconnect();
        return;
      }

      setupSocketHandlers(newSocket);
      setSocket(newSocket);
      newSocket.connect();
    },
    [setupSocketHandlers],
  );

  useEffect(() => {
    let currentSocket: SocketInstance | null = null;

    const initSocket = async () => {
      try {
        setIsConnecting(true);
        setError(null);

        const newSocket = await createSocket(optionsRef.current, recreateSocket);

        if (!mountedRef.current) {
          newSocket.disconnect();
          return;
        }

        setupSocketHandlers(newSocket);
        currentSocket = newSocket;
        setSocket(newSocket);

        if (optionsRef.current.autoConnect !== false) {
          newSocket.connect();
        }
      } catch (err) {
        if (mountedRef.current) {
          const error = err instanceof Error ? err : new Error('Failed to create socket');
          setError(error);
          setIsConnecting(false);
          handlersRef.current.onError?.(error);
        }
      }
    };

    initSocket();

    return () => {
      mountedRef.current = false;
      if (currentSocket) {
        if (optionsRef.current.autoDisconnect !== false) {
          const namespace = optionsRef.current.namespace || '/';
          const withAuth = optionsRef.current.withAuth !== false;
          destroySocket(namespace, withAuth, optionsRef.current.query);
        }
      }
    };
  }, [recreateSocket, setupSocketHandlers]);

  const connect = () => {
    if (socket && !socket.connected) {
      socket.connect();
    }
  };

  const disconnect = () => {
    if (socket?.connected) {
      socket.disconnect();
    }
  };

  const emit = <K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0],
  ) => {
    if (socket?.connected) {
      socket.emit(event as string, data);
    } else {
      console.warn('[use-socket] Cannot emit: socket not connected');
    }
  };

  const on = <K extends keyof ServerToClientEvents>(
    event: K,
    handler: ServerToClientEvents[K],
  ): (() => void) => {
    if (!socket) {
      console.warn('[use-socket] Cannot listen: socket not initialized');
      return () => {};
    }

    type UntypedSocketEvents = {
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      off: (event: string, handler: (...args: unknown[]) => void) => void;
    };
    const untypedSocket = socket as unknown as UntypedSocketEvents;

    untypedSocket.on(event as string, handler as (...args: unknown[]) => void);

    return () => {
      untypedSocket.off(event as string, handler as (...args: unknown[]) => void);
    };
  };

  return {
    socket,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    emit,
    on,
  };
};
