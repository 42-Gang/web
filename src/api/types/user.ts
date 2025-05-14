// 내 프로필 확인
export type UserInfo = {
  id: number;
  nickname: string;
  avatarUrl: string;
  win: number;
  lose: number;
  tournament: number;
};

// 유저 정보 수정
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
