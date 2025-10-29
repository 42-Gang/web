export interface UserInfo {
  id: number;
  nickname: string;
  avatarUrl: string;
}

export interface User {
  id: number;
  nickname: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserList {
  users: User[];
}

export interface UsersSearchPayload {
  nickname: string;
  status: ('ACCEPTED' | 'NONE' | 'PENDING' | 'REJECTED' | 'BLOCKED')[];
  exceptMe: boolean;
}

export type UserStatusType = 'ONLINE' | 'OFFLINE' | 'GAME' | 'LOBBY' | 'AWAY';

export interface UserStatus {
  friendId: number;
  status: UserStatusType;
}

export interface UserProfilePayload {
  id: number;
}
