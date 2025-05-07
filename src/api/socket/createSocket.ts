import { io, Socket } from 'socket.io-client';

const socketCache = new Map<string, Socket>();

export const getSocket = (path: string): Socket => {
  if (socketCache.has(path)) {
    return socketCache.get(path)!;
  }

  const socket = io('/api', {
    path,
    autoConnect: false,
    transports: ['websocket'],
  });

  socketCache.set(path, socket);
  return socket;
};
