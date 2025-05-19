import { atom, useAtom } from 'jotai';

import { UserStatus } from '@/api/types';

const statusAtom = atom<UserStatus[]>([]);

export const useStatusAtom = () => {
  const [statuses, setStatuses] = useAtom(statusAtom);

  const updateStatus = (status: UserStatus) =>
    setStatuses((prev) => {
      const m = new Map(prev.map((s) => [s.friendId, s]));
      m.set(status.friendId, status);
      return [...m.values()];
    });

  return { status: statuses, updateStatus };
};
