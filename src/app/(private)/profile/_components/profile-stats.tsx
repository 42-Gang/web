"use client";

import { useState } from "react";
import { useSuspenseGameStats } from "~/api";
import { EditProfileImageButton } from "~/app/(private)/profile/_components/edit-profile-image-button";
import { NicknameEditModal } from "~/app/(private)/profile/_components/nickname-edit-modal";

type ProfileStatsProps = {
	userId: number;
	nickname: string;
};

export const ProfileStats = ({ userId, nickname }: ProfileStatsProps) => {
	const {
		data: { data: duel },
	} = useSuspenseGameStats({ userId, mode: "duel" });
	const {
		data: { data: tournament },
	} = useSuspenseGameStats({ userId, mode: "tournament" });

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="column gap-4 text-3xl text-white">
				<div className="flex flex-row items-center">
					Nickname :
					<div className="ml-4 flex flex-row items-center gap-2">
						<span className="text-yellow-300">{nickname}</span>
						<EditProfileImageButton onClick={() => setIsOpen(true)} />
					</div>
				</div>
				<div>WIN : {duel.summary.wins}</div>
				<div>LOSE : {duel.summary.losses}</div>
				<div>Tournament : {tournament.summary.wins}</div>
			</div>

			<NicknameEditModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialNickname={nickname} />
		</>
	);
};
