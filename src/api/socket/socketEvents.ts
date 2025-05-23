import { UserStatus } from '@/api/types';

type SocketEventData = {
  'friend-status': UserStatus;
  'friend-request': {
    fromUserId: number;
    fromUserNickname: string;
    toUserId: number;
    timestamp: string;
  };
  'friend-accept': {
    fromUserId: number;
    toUserNickname: string;
    toUserId: number;
    timestamp: string;
  };
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

export interface ClientToServerEvents {
  sendMessage: (data: { text: string }) => void;
}
