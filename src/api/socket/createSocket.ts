import { io, Socket } from 'socket.io-client';

const socketCache = new Map<string, Socket>();

export const getSocket = (path: string, token?: string): Socket => {
  const key = token ? `/${path}?token=${token}` : path;

  if (socketCache.has(key)) {
    return socketCache.get(key)!;
  }

  const socket = io(`https://217.142.135.254/status?token=${token}`, {
    path: `/ws/user`,
    autoConnect: false,
    secure: false,
    transports: ['websocket'],
  });

  socketCache.set(key, socket);
  return socket;
};
