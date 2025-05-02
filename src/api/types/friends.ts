export type FriendRequestUser = {
  userId: string;
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

export type FriendStatus = {
  status: FriendStatusType;
};
