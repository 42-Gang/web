import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

interface SocketOptions {
  handshake: string;
  withToken?: boolean;
}

const socketCache = new Map<string, Socket>();

const buildSocketUrl = (path: string, options: SocketOptions, token?: string): string =>
  `${SOCKET_URL}/${path}${options.withToken && token ? `?token=${token}` : ''}`;

export const getSocket = (
  path: string,
  token: string | undefined,
  options: SocketOptions,
): Socket => {
  const url = buildSocketUrl(path, options, token);
  const key = url;

  if (socketCache.has(key)) {
    return socketCache.get(key)!;
  }

  const socket = io(url, {
    path: options.handshake,
    autoConnect: false,
    transports: ['websocket'],
  });

  socketCache.set(key, socket);
  return socket;
};
