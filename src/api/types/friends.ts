export interface FriendRequestUser {
  userId: number;
  nickname: string;
  avatarUrl: string;
}

export interface FriendRequestUserList {
  requests: FriendRequestUser[];
}

export type FriendStatusType = 'ACCEPTED' | 'BLOCKED' | 'PENDING';

export interface Friend {
  friendId: number;
  nickname: string;
  avatarUrl: string;
  status: FriendStatusType;
}

export interface FriendList {
  friends: Friend[];
}

export interface FriendRequestStatus {
  fromUserId: number;
  fromUserNickname: string;
  toUserId: number;
  timestamp: string;
}

export interface FriendAcceptStatus {
  fromUserId: number;
  toUserNickname: string;
  toUserId: number;
  timestamp: string;
}
