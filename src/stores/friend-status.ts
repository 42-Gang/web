import { atom } from 'jotai';
import type { UserStatus, UserStatusType } from '~/api/types';

export const friendStatusMapAtom = atom<Map<number, UserStatusType>>(new Map());

export const updateFriendStatusAtom = atom(null, (get, set, update: UserStatus) => {
  const current = new Map(get(friendStatusMapAtom));
  current.set(update.friendId, update.status);
  set(friendStatusMapAtom, current);
});

export const getFriendStatusAtom = atom(get => (friendId: number): UserStatusType | null => {
  return get(friendStatusMapAtom).get(friendId) ?? null;
});
