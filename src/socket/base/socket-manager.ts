import { io, type Socket } from 'socket.io-client';
import { getAccessToken } from '~/api/base/token';
import { env } from '~/constants/variables';
import { type SocketOptions, setupErrorHandlers } from './socket-error-handler';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-events';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

interface CachedSocket {
  socket: SocketInstance;
  refCount: number;
}

const cache = new Map<string, CachedSocket>();

const getCacheKey = (ns: string, auth: boolean, query?: Record<string, string>): string => {
  const q = query ? JSON.stringify(query) : '';
  return `${ns}:${auth ? 'auth' : 'noauth'}:${q}`;
};

export const createSocket = async (
  options: SocketOptions,
  onRecreate?: (token: string) => Promise<void>,
): Promise<SocketInstance> => {
  const ns = options.namespace || '/';
  const auth = options.withAuth !== false;
  const key = getCacheKey(ns, auth, options.query);

  const cached = cache.get(key);
  if (cached) {
    cached.refCount++;
    return cached.socket;
  }

  const query: Record<string, string> = { ...options.query };

  if (auth && !query.token) {
    const token = await getAccessToken();
    if (token) {
      query.token = token;
    } else {
      console.warn('[socket] Creating socket without authentication token');
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

  cache.set(key, { socket, refCount: 1 });
  return socket;
};

export const destroySocket = (ns = '/', auth = true, query?: Record<string, string>) => {
  const key = getCacheKey(ns, auth, query);
  const cached = cache.get(key);

  if (cached) {
    cached.refCount--;
    
    if (cached.refCount <= 0) {
      cached.socket.removeAllListeners();
      cached.socket.disconnect();
      cache.delete(key);
    }
  }
};

export const getSocket = (
  ns = '/',
  auth = true,
  query?: Record<string, string>,
): SocketInstance | null => {
  const key = getCacheKey(ns, auth, query);
  const cached = cache.get(key);
  return cached?.socket || null;
};

export type { SocketOptions } from './socket-error-handler';
