import type { Socket } from 'socket.io-client';
import { create } from 'zustand';

import { ServerToClientEvents, ClientToServerEvents } from '../socket';

type WaitingSocketStore = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  setSocket: (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => void;
};

export const useWaitingSocketStore = create<WaitingSocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}));
