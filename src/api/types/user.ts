export type UserInfo = {
  id: number;
  nickname: string;
  avatarUrl: string;
  win: number;
  lose: number;
  tournament: number;
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
