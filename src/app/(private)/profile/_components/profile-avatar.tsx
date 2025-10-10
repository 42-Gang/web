'use client';

import Image from 'next/image';
import { type ChangeEvent, useRef } from 'react';
import { useUploadAvatar } from '~/api';
import { extractErrorData } from '~/api/base';
import { ImageIcon } from '~/components/icon';
import { toast } from 'sonner';

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

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadAvatar(formData, {
      onSuccess: () => {
        toast.success('프로필 변경 완료!', { duration: 2000 });
      },
      onError: async error => {
        console.error('Failed to upload avatar:', error);
        const errorData = await extractErrorData(error);
        alert(errorData?.message || '이미지 업로드에 실패했습니다.');
      },
    });
  };

  return (
    <div className="relative m-8 mr-14">
      <Image
        className="size-[200px] overflow-hidden rounded-full object-cover"
        src={avatarUrl}
        alt={`${nickname} Profile Image`}
        width={200}
        height={200}
        draggable={false}
      />
      <button
        type="button"
        onClick={handleImageClick}
        className="absolute right-3 bottom-3 flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 active:translate-y-px"
      >
        <ImageIcon className="size-7 text-gray-700" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
