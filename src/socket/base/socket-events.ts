export type FriendRequestStatus = {
  fromUserId: number;
  fromUserNickname: string;
  toUserId: number;
  timestamp: string;
};

export type FriendAcceptStatus = {
  fromUserId: number;
  toUserNickname: string;
  toUserId: number;
  timestamp: string;
};

export type ServerToClientEvents = {
  'friend-request': (data: FriendRequestStatus) => void;
  'friend-accept': (data: FriendAcceptStatus) => void;
};

export type ClientToServerEvents = Record<string, (data: unknown) => void>;
