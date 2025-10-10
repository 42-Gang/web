"use client";

import Image from "next/image";
import { useRef, type ChangeEvent } from "react";
import { useUploadAvatar } from "~/api";
import { ImageIcon } from "~/components/icon";

type ProfileAvatarProps = {
	avatarUrl: string;
	nickname: string;
};

export const ProfileAvatar = ({ avatarUrl, nickname }: ProfileAvatarProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { mutate: uploadAvatar } = useUploadAvatar();

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// 이미지 파일 검증
		if (!file.type.startsWith("image/")) {
			alert("이미지 파일만 업로드 가능합니다.");
			return;
		}

		// 파일 크기 검증 (예: 5MB)
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			alert("파일 크기는 5MB 이하여야 합니다.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		uploadAvatar(formData, {
			onSuccess: () => {
				// 성공 처리는 자동으로 쿼리 invalidation이 됨
			},
			onError: (error) => {
				console.error("Failed to upload avatar:", error);
				alert("이미지 업로드에 실패했습니다.");
			},
		});
	};

	return (
		<div className="relative m-8 mr-14">
			<Image className="size-[200px] overflow-hidden rounded-full object-cover" src={avatarUrl} alt={`${nickname} Profile Image`} width={200} height={200} draggable={false} />
			<button type="button" onClick={handleImageClick} className="absolute right-3 bottom-3 flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 active:translate-y-px">
				<ImageIcon className="size-7 text-gray-700" />
			</button>
			<input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
		</div>
	);
};
