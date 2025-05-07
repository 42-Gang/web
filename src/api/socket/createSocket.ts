import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socketCache = new Map<string, Socket>();

export const getSocket = (path: string): Socket => {
  if (socketCache.has(path)) {
    return socketCache.get(path)!;
  }

  const socket = io(SOCKET_URL, {
    path,
    autoConnect: false,
    transports: ['websocket'],
  });

  socketCache.set(path, socket);
  return socket;
};
