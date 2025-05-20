import { UserStatus , MessageFromServer } from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  message: MessageFromServer;
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

export interface ClientToServerEvents {
  message: (data: { roomId: number; contents: string }) => void;
}
