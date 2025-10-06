import { io, type Socket } from 'socket.io-client';
import { getAccessToken, tokenRefreshMutex } from '~/api/base/token';
import { env } from '~/constants/variables';
import { type SocketOptions, setupAuthErrorHandlers } from './socket-error-handler';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-events';

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

export const createSocket = async (
  options: SocketOptions,
  onSocketRecreate?: (newToken: string) => Promise<void>,
): Promise<SocketInstance> => {
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

  if (withAuth && !query.token) {
    const token = await ensureValidToken();
    if (token) {
      query.token = token;
    } else {
      console.warn('[socket-manager] Creating socket without token');
    }
  }

  const socket: SocketInstance = io(url, {
    path: options.path,
    autoConnect: false,
    transports: ['websocket'],
    query,
    reconnection: false,
  });

  if (onSocketRecreate) {
    setupAuthErrorHandlers(socket, options, onSocketRecreate);
  }

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

export type { SocketOptions } from './socket-error-handler';
