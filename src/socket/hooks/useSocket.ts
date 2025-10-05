import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    optionsRef.current = options;
    handlersRef.current = {
      onConnect: options.onConnect,
      onDisconnect: options.onDisconnect,
      onError: options.onError,
    };
  }, [options]);

  useEffect(() => {
    let mounted = true;
    let currentSocket: SocketInstance | null = null;

    const initSocket = async () => {
      try {
        setIsConnecting(true);
        setError(null);

        const newSocket = await createSocket(optionsRef.current);

        if (!mounted) {
          newSocket.disconnect();
          return;
        }

        newSocket.on('connect', () => {
          if (mounted) {
            setIsConnected(true);
            setIsConnecting(false);
            handlersRef.current.onConnect?.();
          }
        });

        newSocket.on('disconnect', reason => {
          if (mounted) {
            setIsConnected(false);
            setIsConnecting(false);
            handlersRef.current.onDisconnect?.(reason);
          }
        });

        newSocket.on('connect_error', err => {
          if (mounted) {
            setError(err as Error);
            setIsConnecting(false);
            handlersRef.current.onError?.(err as Error);
          }
        });

        currentSocket = newSocket;
        setSocket(newSocket);

        if (optionsRef.current.autoConnect !== false) {
          newSocket.connect();
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof Error ? err : new Error('Failed to create socket');
          setError(error);
          setIsConnecting(false);
          handlersRef.current.onError?.(error);
        }
      }
    };

    initSocket();

    return () => {
      mounted = false;
      if (currentSocket) {
        if (optionsRef.current.autoDisconnect !== false) {
          const namespace = optionsRef.current.namespace || '/';
          const withAuth = optionsRef.current.withAuth !== false;
          destroySocket(namespace, withAuth, optionsRef.current.query);
        }
      }
    };
  }, []);

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
      console.warn('[useSocket] Cannot emit: socket not connected');
    }
  };

  const on = <K extends keyof ServerToClientEvents>(
    event: K,
    handler: ServerToClientEvents[K],
  ): (() => void) => {
    if (!socket) {
      console.warn('[useSocket] Cannot listen: socket not initialized');
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
