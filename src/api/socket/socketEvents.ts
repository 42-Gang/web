import { UserStatus } from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

export interface ClientToServerEvents {
  sendMessage: (data: { text: string }) => void;
}
