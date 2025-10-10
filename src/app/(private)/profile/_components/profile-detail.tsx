"use client";

import { useSuspenseUsersMe } from "~/api";
import { ProfileAvatar } from "~/app/(private)/profile/_components/profile-avatar";
import { ProfileStats } from "~/app/(private)/profile/_components/profile-stats";

export const ProfileDetail = () => {
	const {
		data: { data: user },
	} = useSuspenseUsersMe();

	return (
		<div className="flex flex-row content-center items-center">
			<ProfileAvatar avatarUrl={user.avatarUrl} nickname={user.nickname} />
			<ProfileStats userId={user.id} nickname={user.nickname} />
		</div>
	);
};
