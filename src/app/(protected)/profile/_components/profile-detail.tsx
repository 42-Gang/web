'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys, type UserInfo } from '~/api';
import { ProfileAvatar } from './profile-avatar';
import { ProfileStats } from './profile-stats';

export const ProfileDetail = () => {
  const { data } = useSuspenseQuery(queryKeys.users.me);
  const user: UserInfo = data.data;

  return (
    <div className="flex flex-row content-center items-center">
      <ProfileAvatar avatarUrl={user.avatarUrl} nickname={user.nickname} />
      <ProfileStats userId={user.id} nickname={user.nickname} />
    </div>
  );
};
