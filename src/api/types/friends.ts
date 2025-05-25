export type FriendRequestUser = {
  userId: number;
  nickname: string;
  avatarUrl: string;
};

export type FriendRequestUserList = {
  requests: FriendRequestUser[];
};

export type FriendStatusType = 'ACCEPTED' | 'BLOCKED' | 'PENDING';

export type Friend = {
  friendId: number;
  nickname: string;
  avatarUrl: string;
  status: FriendStatusType;
};

export type FriendList = {
  friends: Friend[];
};

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
