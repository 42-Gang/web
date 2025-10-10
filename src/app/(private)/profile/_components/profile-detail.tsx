'use client';

import Image from 'next/image';
import { useSuspenseGameStats, useSuspenseUsersMe } from '~/api';
import { EditProfileImageButton } from '~/app/(private)/profile/_components/edit-profile-image-button';
import { ImageIcon } from '~/components/icon';

export const ProfileDetail = () => {
  const {
    data: { data: user },
  } = useSuspenseUsersMe();
  const {
    data: { data: duel },
  } = useSuspenseGameStats({ userId: user.id, mode: 'duel' });
  const {
    data: { data: tournament },
  } = useSuspenseGameStats({ userId: user.id, mode: 'tournament' });

  return (
    <div className="flex flex-row content-center items-center">
      <div className="relative m-8 mr-14">
        <Image
          className="size-[200px] overflow-hidden rounded-full object-cover"
          src={user.avatarUrl}
          alt={`${user.nickname} Profile Image`}
          width={200}
          height={200}
          draggable={false}
        />
        <button
          type="button"
          className="absolute right-3 bottom-3 flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 active:translate-y-px"
        >
          <ImageIcon className="size-7 text-gray-700" />
        </button>
      </div>

      <div className="column gap-4 text-3xl text-white">
        <div className="flex flex-row items-center">
          Nickname :
          <div className="ml-4 flex flex-row items-center gap-2">
            <span className="text-yellow-300">{user.nickname}</span>
            <EditProfileImageButton />
          </div>
        </div>
        <div>WIN : {duel.summary.wins}</div>
        <div>LOSE : {duel.summary.losses}</div>
        <div>Tournament : {tournament.summary.wins}</div>
      </div>
    </div>
  );
};
