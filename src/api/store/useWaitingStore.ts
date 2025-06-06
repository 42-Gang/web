import { create } from 'zustand';

import type { UserInfo } from '@/api/types';

type WaitingStore = {
  users: UserInfo[];
  tournamentSize: number;
  setUsers: (users: UserInfo[]) => void;
  setTournamentSize: (size: number) => void;
};

export const useWaitingStore = create<WaitingStore>((set) => ({
  users: [],
  tournamentSize: 0,
  setUsers: (users) => set({ users }),
  setTournamentSize: (size) => set({ tournamentSize: size })
}));
