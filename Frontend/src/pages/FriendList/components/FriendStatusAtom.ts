import { atom } from 'recoil'

export interface FriendStatus {
  friendId: number
  status: 'ONLINE' | 'OFFLINE' | 'GAME' | 'AWAY' | 'LOBBY'
}

export const friendStatusAtom = atom<Record<number, FriendStatus['status']>>({
  key: 'friendStatusAtom',
  default: {}
})