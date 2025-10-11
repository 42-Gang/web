'use client';

import { type UserInfo, useSuspenseUsersMe } from '~/api';
import { ProfileAvatar } from './profile-avatar';
import { ProfileStats } from './profile-stats';

export const ProfileDetail = () => {
  const { data } = useSuspenseUsersMe();
  const user: UserInfo = data.data;

  return (
    <div className="flex flex-row content-center items-center">
      <ProfileAvatar avatarUrl={user.avatarUrl} nickname={user.nickname} />
      <ProfileStats userId={user.id} nickname={user.nickname} />
    </div>
  );
};
