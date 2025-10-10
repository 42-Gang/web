'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useUpdateProfile } from '~/api';
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
    if (value.length > 8) {
      alert('닉네임은 최대 8자까지 가능합니다.');
      return;
    }

    updateProfile(
      { nickname: value },
      {
        onSuccess: () => {
          onClose();
        },
        onError: error => {
          console.error('Failed to update profile:', error);
          alert('닉네임 변경에 실패했습니다.');
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
            onChange={e => setNickname(e.target.value.slice(0, 8))}
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
