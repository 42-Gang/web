import { io, type Socket } from 'socket.io-client';
import { getAccessToken, refreshToken, tokenRefreshMutex } from '~/api/base/token';
import { env } from '~/constants/variables';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-events';

export interface SocketOptions {
  path: string;
  namespace?: string;
  withAuth?: boolean;
  autoReconnect?: boolean;
  query?: Record<string, string>;
}

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

const socketCache = new Map<string, SocketInstance>();

const getSocketCacheKey = (
  namespace: string,
  withAuth: boolean,
  query?: Record<string, string>,
): string => {
  const queryStr = query ? JSON.stringify(query) : '';
  return `${namespace}:${withAuth ? 'auth' : 'noauth'}:${queryStr}`;
};

const ensureValidToken = async (): Promise<string | null> => {
  const token = getAccessToken();

  if (!token) {
    console.warn('[socket-manager] No access token found');
    return null;
  }

  if (tokenRefreshMutex.isLocked()) {
    await tokenRefreshMutex.waitForUnlock();
    return getAccessToken();
  }

  return token;
};

const setupAuthErrorHandlers = (socket: SocketInstance, options: SocketOptions) => {
  socket.on('connect_error', async error => {
    console.error('[socket-manager] Connection error:', error);

    if (error.message.includes('auth') || error.message.includes('token')) {
      if (options.autoReconnect !== false) {
        console.log('[socket-manager] Attempting token refresh...');

        try {
          if (tokenRefreshMutex.isLocked()) {
            await tokenRefreshMutex.waitForUnlock();
          } else {
            await tokenRefreshMutex.runExclusive(async () => {
              await refreshToken();
            });
          }

          const newToken = getAccessToken();
          if (newToken && socket.io.opts.query) {
            (socket.io.opts.query as Record<string, string>).token = newToken;
            socket.connect();
          }
        } catch (refreshError) {
          console.error('[socket-manager] Token refresh failed:', refreshError);
          socket.disconnect();
        }
      }
    }
  });

  socket.on('disconnect', reason => {
    console.log('[socket-manager] Disconnected:', reason);
  });

  socket.on('error', error => {
    console.error('[socket-manager] Socket error:', error);
  });
};

export const createSocket = async (options: SocketOptions): Promise<SocketInstance> => {
  const namespace = options.namespace || '/';
  const withAuth = options.withAuth !== false;
  const cacheKey = getSocketCacheKey(namespace, withAuth, options.query);

  if (socketCache.has(cacheKey)) {
    const cachedSocket = socketCache.get(cacheKey);
    if (cachedSocket?.connected) {
      return cachedSocket;
    }
  }

  const baseUrl = env.api_base || 'http://localhost:3000';
  const url = `${baseUrl}${namespace}`;

  const query: Record<string, string> = { ...options.query };

  if (withAuth) {
    const token = await ensureValidToken();
    if (token) {
      query.token = token;
    }
  }

  const socket: SocketInstance = io(url, {
    path: options.path,
    autoConnect: false,
    transports: ['websocket'],
    query,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  setupAuthErrorHandlers(socket, options);

  socketCache.set(cacheKey, socket);
  return socket;
};

export const destroySocket = (namespace = '/', withAuth = true, query?: Record<string, string>) => {
  const cacheKey = getSocketCacheKey(namespace, withAuth, query);
  const socket = socketCache.get(cacheKey);

  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socketCache.delete(cacheKey);
    console.log('[socket-manager] Socket destroyed:', cacheKey);
  }
};

export const destroyAllSockets = () => {
  for (const [key, socket] of socketCache) {
    socket.removeAllListeners();
    socket.disconnect();
    console.log('[socket-manager] Socket destroyed:', key);
  }
  socketCache.clear();
};

export const getSocket = (
  namespace = '/',
  withAuth = true,
  query?: Record<string, string>,
): SocketInstance | null => {
  const cacheKey = getSocketCacheKey(namespace, withAuth, query);
  return socketCache.get(cacheKey) || null;
};
