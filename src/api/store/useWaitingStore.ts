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

  setUsers: (users: UserInfo[]) => void;
  setTournamentSize: (size: number) => void;
  setRoomId: (id: string) => void;
  clearRoom: () => void;

  invitation?: Invitation;
  setInvitation: (data: Invitation) => void;
  clearInvitation: () => void;
};;

export const useWaitingStore = create<WaitingStore>((set) => ({
  users: [],
  tournamentSize: 0,
  roomId: null,
  invitation: undefined,

  setUsers: (users) => set({ users }),
  setTournamentSize: (size) => set({ tournamentSize: size }),
  setRoomId: (id) => set({ roomId: id }),
  clearRoom: () =>
    set({
      users: [],
      tournamentSize: 0,
      roomId: null
    }),

    setInvitation: (data) => set({ invitation: data }),
    clearInvitation: () => set({ invitation: undefined })
}));
