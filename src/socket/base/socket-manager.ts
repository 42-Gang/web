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
const pendingCreations = new Map<string, Promise<SocketInstance>>();

const getCacheKey = (
  path: string,
  ns: string,
  auth: boolean,
  query?: Record<string, string>,
): string => {
  const { token: _token, ...otherQuery } = query || {};
  const sortedQuery = Object.keys(otherQuery)
    .sort()
    .reduce((acc, key) => {
      acc[key] = otherQuery[key];
      return acc;
    }, {} as Record<string, string>);
  const q = Object.keys(sortedQuery).length > 0 ? JSON.stringify(sortedQuery) : '';
  return `${path}:${ns}:${auth ? 'auth' : 'noauth'}:${q}`;
};

export const createSocket = async (
  options: SocketOptions,
  onRecreate?: (token: string) => Promise<void>,
): Promise<SocketInstance> => {
  const path = options.path;
  const ns = options.namespace || '/';
  const auth = options.withAuth !== false;
  const key = getCacheKey(path, ns, auth, options.query);

  const cached = cache.get(key);
  if (cached) {
    cached.refCount++;

    if (
      auth &&
      options.query?.token &&
      cached.socket.io.opts.query?.token !== options.query.token
    ) {
      console.log('[socket-manager] Updating socket token for existing connection');
      cached.socket.io.opts.query = { ...cached.socket.io.opts.query, token: options.query.token };
    }

    return cached.socket;
  }

  const pending = pendingCreations.get(key);
  if (pending) {
    return pending;
  }

  const createPromise = (async () => {
    const query: Record<string, string> = { ...options.query };

    if (auth && !query.token) {
      const token = getAccessToken();
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
      forceNew: options.forceNew ?? false,
    });

    if (onRecreate) {
      setupErrorHandlers(socket, options, onRecreate);
    }

    cache.set(key, { socket, refCount: 1 });
    return socket;
  })();

  pendingCreations.set(key, createPromise);

  try {
    return await createPromise;
  } finally {
    pendingCreations.delete(key);
  }
};

export const destroySocket = (
  path: string,
  ns = '/',
  auth = true,
  query?: Record<string, string>,
) => {
  const key = getCacheKey(path, ns, auth, query);
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

export type { SocketOptions } from './socket-error-handler';
