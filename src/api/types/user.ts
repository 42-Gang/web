export type UserInfo = {
  id: number;
  nickname: string;
  avatarUrl: string;
};

export type User = {
  id: number;
  nickname: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type UserList = {
  users: User[];
};

export type UsersSearchPayload = {
  nickname: string;
  status: ('ACCEPTED' | 'NONE' | 'PENDING' | 'REJECTED' | 'BLOCKED')[];
  exceptMe: boolean;
};

export type UserStatusType = 'ONLINE' | 'OFFLINE' | 'GAME' | 'LOBBY' | 'AWAY';

export type UserStatus = {
  friendId: number;
  status: UserStatusType;
};

export type UserProfilePayload = {
  id: number;
};
