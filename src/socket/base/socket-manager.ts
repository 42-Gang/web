import { io, type Socket } from 'socket.io-client';
import { getAccessToken, tokenRefreshMutex } from '~/api/base/token';
import { env } from '~/constants/variables';
import { type SocketOptions, setupErrorHandlers } from './socket-error-handler';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-events';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

const cache = new Map<string, SocketInstance>();

const getCacheKey = (ns: string, auth: boolean, query?: Record<string, string>): string => {
  const q = query ? JSON.stringify(query) : '';
  return `${ns}:${auth ? 'auth' : 'noauth'}:${q}`;
};

const getToken = async (): Promise<string | null> => {
  const token = getAccessToken();
  if (!token) return null;

  if (tokenRefreshMutex.isLocked()) {
    await tokenRefreshMutex.waitForUnlock();
    return getAccessToken();
  }

  return token;
};

export const createSocket = async (
  options: SocketOptions,
  onRecreate?: (token: string) => Promise<void>,
): Promise<SocketInstance> => {
  const ns = options.namespace || '/';
  const auth = options.withAuth !== false;
  const key = getCacheKey(ns, auth, options.query);

  const cached = cache.get(key);
  if (cached?.connected) return cached;

  const query: Record<string, string> = { ...options.query };

  if (auth && !query.token) {
    const token = await getToken();
    if (token) {
      query.token = token;
    } else {
      console.warn('[socket] Creating without token');
    }
  }

  const socket: SocketInstance = io(`${env.api_base}${ns}`, {
    path: options.path,
    autoConnect: false,
    transports: ['websocket'],
    query,
    reconnection: false,
  });

  if (onRecreate) {
    setupErrorHandlers(socket, options, onRecreate);
  }

  cache.set(key, socket);
  return socket;
};

export const destroySocket = (ns = '/', auth = true, query?: Record<string, string>) => {
  const key = getCacheKey(ns, auth, query);
  const socket = cache.get(key);

  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    cache.delete(key);
    console.log('[socket] Destroyed:', key);
  }
};

export const getSocket = (
  ns = '/',
  auth = true,
  query?: Record<string, string>,
): SocketInstance | null => {
  const key = getCacheKey(ns, auth, query);
  return cache.get(key) || null;
};

export type { SocketOptions } from './socket-error-handler';
