import { create } from 'zustand';

import type { UserInfo } from '@/api/types';

type WaitingStore = {
  users: UserInfo[];
  setUsers: (users: UserInfo[]) => void;
};

export const useWaitingStore = create<WaitingStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
