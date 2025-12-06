import { useCallback, useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '../base/socket-events';
import { createSocket, destroySocket, type SocketOptions } from '../base/socket-manager';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

interface UntypedSocket {
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  off: (event: string, handler: (...args: unknown[]) => void) => void;
}

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
    ...args: Parameters<ClientToServerEvents[K]>
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

  const internalListeners = useRef<{
    connect: () => void;
    disconnect: (reason: string) => void;
    connect_error: (err: Error) => void;
  } | null>(null);

  const cleanupHandlers = useCallback((sock: SocketInstance) => {
    if (!internalListeners.current) return;
    sock.off('connect', internalListeners.current.connect);
    sock.off('disconnect', internalListeners.current.disconnect);
    sock.off('connect_error', internalListeners.current.connect_error);
    internalListeners.current = null;
  }, []);

  const setupHandlers = useCallback(
    (sock: SocketInstance) => {
      cleanupHandlers(sock);

      const onConnect = () => {
        if (isMounted.current) {
          setConnected(true);
          setConnecting(false);
          handlersRef.current.onConnect?.();
        }
      };

      const onDisconnect = (reason: string) => {
        if (isMounted.current) {
          setConnected(false);
          setConnecting(false);
          handlersRef.current.onDisconnect?.(reason);
        }
      };

      const onError = (err: Error) => {
        if (isMounted.current) {
          setError(err);
          setConnecting(false);
          handlersRef.current.onError?.(err);
        }
      };

      internalListeners.current = {
        connect: onConnect,
        disconnect: onDisconnect,
        connect_error: onError,
      };

      sock.on('connect', onConnect);
      sock.on('disconnect', onDisconnect);
      sock.on('connect_error', onError);
    },
    [cleanupHandlers],
  );

  const recreate = useCallback(
    async (token: string) => {
      if (!isMounted.current) return;

      if (isRecreating.current) {
        console.log('[useSocket] Recreate already in progress, skipping...');
        return;
      }

      isRecreating.current = true;

      try {
        if (socket) {
          cleanupHandlers(socket);

          if (socket.connected) {
            socket.disconnect();
          }
        }

        const newOpts = {
          ...optsRef.current,
          query: { ...optsRef.current.query, token },
        };

        const newSocket = await createSocket(newOpts, recreate);

        if (!isMounted.current) {
          const path = newOpts.path;
          const ns = newOpts.namespace || '/';
          const auth = newOpts.withAuth !== false;
          destroySocket(path, ns, auth, newOpts.query);
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
    [setupHandlers, cleanupHandlers, socket],
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
        const path = optsRef.current.path;
        const ns = optsRef.current.namespace || '/';
        const auth = optsRef.current.withAuth !== false;
        destroySocket(path, ns, auth, optsRef.current.query);
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

  const emit = useCallback(
    <K extends keyof ClientToServerEvents>(
      event: K,
      ...args: Parameters<ClientToServerEvents[K]>
    ) => {
      if (socket?.connected) {
        socket.emit(event, ...args);
      } else {
        console.warn('[socket] Cannot emit: not connected');
      }
    },
    [socket],
  );

  const on = useCallback(
    <K extends keyof ServerToClientEvents>(
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
    },
    [socket],
  );

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
