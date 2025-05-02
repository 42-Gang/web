export type UserInfo = {
  nickname: string;
  avatar: string;
  win: number;
  lose: number;
  tournament: number;
};

export type UserProfile = {
  nickname: string;
  avatar: string;
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
