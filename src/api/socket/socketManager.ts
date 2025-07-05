import { io, Socket } from 'socket.io-client';

import { ServerToClientEvents, ClientToServerEvents } from './socketEvents';
import { socketPubSub } from './socketPubSub';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export interface SocketOptions {
  handshake: string;
  withToken?: boolean;
}

const socketCache = new Map<string, Socket<ServerToClientEvents, ClientToServerEvents>>();

const getSocketKey = (path: string, token: string | undefined, withToken: boolean): string =>
  `${SOCKET_URL}/${path}${withToken && token ? `${path.includes('?') ? '&' : '?'}token=${token}` : ''}`;

export const createSocket = (
  path: string,
  token: string | undefined,
  options: SocketOptions,
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  const url = getSocketKey(path, token, options.withToken ?? true);

  if (socketCache.has(url)) return socketCache.get(url)!;

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
    path: options.handshake,
    autoConnect: false,
    transports: ['websocket'],
  });

  socket.onAny((event, payload) => {
    socketPubSub.publish(event as keyof ServerToClientEvents, payload);
  });

  socketCache.set(url, socket);
  return socket;
};

export const destroySocket = (path: string, token: string | undefined, options: SocketOptions) => {
  const key = getSocketKey(path, token, options.withToken ?? true);
  const socket = socketCache.get(key);
  if (socket) {
    socket.disconnect();
    socketCache.delete(key);
  }
};
