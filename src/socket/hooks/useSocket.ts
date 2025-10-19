import { useCallback, useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '../base/socket-events';
import { createSocket, destroySocket, type SocketOptions } from '../base/socket-manager';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

type UntypedSocket = {
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  off: (event: string, handler: (...args: unknown[]) => void) => void;
};

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
  const [isConnected, setConnected] = useState(false);
  const [isConnecting, setConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const optsRef = useRef(options);
  const handlersRef = useRef({
    onConnect: options.onConnect,
    onDisconnect: options.onDisconnect,
    onError: options.onError,
  });
  const isMounted = useRef(true);
  const isRecreating = useRef(false);

  useEffect(() => {
    optsRef.current = options;
    handlersRef.current = {
      onConnect: options.onConnect,
      onDisconnect: options.onDisconnect,
      onError: options.onError,
    };
  }, [options]);

  const setupHandlers = useCallback((sock: SocketInstance) => {
    sock.on('connect', () => {
      if (isMounted.current) {
        setConnected(true);
        setConnecting(false);
        handlersRef.current.onConnect?.();
      }
    });

    sock.on('disconnect', reason => {
      if (isMounted.current) {
        setConnected(false);
        setConnecting(false);
        handlersRef.current.onDisconnect?.(reason);
      }
    });

    sock.on('connect_error', err => {
      if (isMounted.current) {
        setError(err as Error);
        setConnecting(false);
        handlersRef.current.onError?.(err as Error);
      }
    });
  }, []);

  const recreate = useCallback(
    async (token: string) => {
      if (!isMounted.current) return;

      if (isRecreating.current) {
        console.log('[useSocket] Recreate already in progress, skipping...');
        return;
      }

      isRecreating.current = true;

      try {
        const ns = optsRef.current.namespace || '/';
        const auth = optsRef.current.withAuth !== false;

        if (socket) {
          socket.removeAllListeners();
          socket.disconnect();
        }

        destroySocket(ns, auth, optsRef.current.query);

        const newOpts = {
          ...optsRef.current,
          query: { ...optsRef.current.query, token },
        };

        const newSocket = await createSocket(newOpts, recreate);

        if (!isMounted.current) {
          newSocket.disconnect();
          return;
        }

        setupHandlers(newSocket);
        setSocket(newSocket);

        setConnected(false);
        setConnecting(true);
        setError(null);

        if (newSocket.connected) {
          setConnected(true);
          setConnecting(false);
          handlersRef.current.onConnect?.();
        } else {
          newSocket.connect();
        }
      } finally {
        isRecreating.current = false;
      }
    },
    [setupHandlers, socket],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: recreate and setupHandlers are stable, adding them would cause infinite loop
  useEffect(() => {
    isMounted.current = true;
    let current: SocketInstance | null = null;

    const init = async () => {
      try {
        setConnecting(true);
        setError(null);

        const sock = await createSocket(optsRef.current, recreate);

        if (!isMounted.current) {
          sock.disconnect();
          return;
        }

        setupHandlers(sock);
        current = sock;
        setSocket(sock);

        if (sock.connected) {
          setConnected(true);
          setConnecting(false);
          handlersRef.current.onConnect?.();
        } else if (optsRef.current.autoConnect !== false) {
          sock.connect();
        }
      } catch (err) {
        if (isMounted.current) {
          const error = err instanceof Error ? err : new Error('Socket creation failed');
          console.error('[useSocket] Socket initialization error:', error);
          setError(error);
          setConnecting(false);
          handlersRef.current.onError?.(error);
        }
      }
    };

    init();

    return () => {
      isMounted.current = false;
      if (current) {
        const ns = optsRef.current.namespace || '/';
        const auth = optsRef.current.withAuth !== false;
        destroySocket(ns, auth, optsRef.current.query);
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
      console.warn('[socket] Cannot emit: not connected');
    }
  };

  const on = <K extends keyof ServerToClientEvents>(
    event: K,
    handler: ServerToClientEvents[K],
  ): (() => void) => {
    if (!socket) {
      return () => {};
    }

    const untyped = socket as unknown as UntypedSocket;
    untyped.on(event as string, handler as (...args: unknown[]) => void);

    return () => {
      untyped.off(event as string, handler as (...args: unknown[]) => void);
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
