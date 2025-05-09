import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

interface SocketOptions {
  handshake: string;
  withToken?: boolean;
}

const socketCache = new Map<string, Socket>();

export const createSocket = (
  path: string,
  token: string | undefined,
  options: SocketOptions,
): Socket => {
  const url = `${SOCKET_URL}/${path}${options.withToken && token ? `?token=${token}` : ''}`;
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
