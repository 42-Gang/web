import { create } from 'zustand';

import type { UserInfo } from '@/api/types';

type Invitation = {
  roomId: string;
  hostId: number;
};

type WaitingStore = {
  users: UserInfo[];
  tournamentSize: number;
  roomId: string | null;
  invitation?: Invitation;
  hostId: number | null;

  setUsers: (users: UserInfo[]) => void;
  setTournamentSize: (size: number) => void;
  setRoomId: (id: string) => void;
  clearRoom: () => void;

  setInvitation: (data: Invitation) => void;
  clearInvitation: () => void;

  setHostId: (id: number) => void;
  clearHost: () => void;
};

export const useWaitingStore = create<WaitingStore>((set) => ({
  users: [],
  tournamentSize: 0,
  roomId: null,
  invitation: undefined,
  hostId: null,

  setUsers: (users) => set({ users }),
  setTournamentSize: (size) => set({ tournamentSize: size }),
  setRoomId: (id) => set({ roomId: id }),

  setInvitation: (data) => set({ invitation: data }),
  clearInvitation: () => set({ invitation: undefined }),

  setHostId: (id) => set({ hostId: id }),
  clearHost: () => set({ hostId: null }),

  clearRoom: () =>
    set({
      users: [],
      tournamentSize: 0,
      roomId: null,
      hostId: null,
    }),
}));
