import { io, Socket } from 'socket.io-client';

import { ServerToClientEvents, ClientToServerEvents } from './socketEvents';
import { socketPubSub } from './socketPubSub';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export interface TokenParam {
  accessToken?: string;
}

export interface SocketOptions {
  handshake: string;
  withToken?: boolean;
  token?: TokenParam;
}

const socketCache = new Map<string, Socket<ServerToClientEvents, ClientToServerEvents>>();

const getSocketKey = (path: string, options: SocketOptions): string => {
  const withToken = options.withToken ?? true;
  const token = options.token?.accessToken;
  const tokenQuery = withToken && token ? `${path.includes('?') ? '&' : '?'}token=${token}` : '';
  return `${SOCKET_URL}/${path}${tokenQuery}`;
};

export const createSocket = (
  path: string,
  options: SocketOptions,
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  const url = getSocketKey(path, options);

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

export const destroySocket = (path: string, options: SocketOptions) => {
  const key = getSocketKey(path, options);
  const socket = socketCache.get(key);
  if (socket) {
    socket.disconnect();
    socketCache.delete(key);
  }
};
