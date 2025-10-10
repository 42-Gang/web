'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { useUpdateProfile } from '~/api';
import { extractErrorData } from '~/api/base';
import { TimesIcon } from '~/components/icon';
import { CTAButton } from '~/components/ui';

type NicknameEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialNickname?: string;
};

export const NicknameEditModal = ({
  isOpen,
  onClose,
  initialNickname = '',
}: NicknameEditModalProps) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [nickname, setNickname] = useState(initialNickname);

  useEffect(() => {
    if (isOpen) setNickname(initialNickname ?? '');
  }, [isOpen, initialNickname]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const value = nickname.trim();
    if (!value) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    updateProfile(
      { nickname: value },
      {
        onSuccess: () => {
          toast.success('프로필 업데이트완료!', { duration: 2000 });
          onClose();
        },
        onError: async error => {
          console.error('Failed to update profile:', error);
          const data = await extractErrorData(error);
          alert(data?.message ?? '프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={isPending ? undefined : onClose}
        aria-label="Close modal"
      />

      <div className="relative z-10 w-[480px] rounded-[24px] bg-white p-10 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="absolute top-4 right-4 text-black/70 hover:text-black active:translate-y-px disabled:opacity-50"
        >
          <TimesIcon className="size-7" />
        </button>

        <h2 className={twMerge('mb-6 text-center text-[40px] text-black')}>Change nickname</h2>

        <div className="mb-8">
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Max 8 letters!"
            maxLength={8}
            className="w-full rounded-[16px] border-4 border-black/80 bg-white px-4 py-5 text-center text-[28px] text-black placeholder-black/40 outline-none"
            disabled={isPending}
          />
        </div>

        <div className="flex justify-center">
          <CTAButton size="lg" onClick={handleConfirm} disabled={isPending} className="!bg-black">
            Confirm
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
