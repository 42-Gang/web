import React from "react";
import FallbackImage from "../../../assets/image/BasicProfile1.png";

import {
  ModalOverlay,
  ModalCard,
  Avatar,
  Username,
  StatRow,
  CloseButton,
} from "./UserProfileModal.styles.ts";

interface UserProfileModalProps {
  nickname: string;
  avatar: string;
  wins: number;
  losses: number;
  tournamentWins: number;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  nickname,
  avatar,
  wins,
  losses,
  tournamentWins,
  onClose,
}) => {
  console.log("👤 모달 사용자 프로필 이미지:", avatar);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Avatar
          src={avatar}
          alt="avatar"
          onError={(e) => {
            console.warn("⛔️ 이미지 로드 실패 → 기본 이미지로 fallback");
            (e.currentTarget as HTMLImageElement).src = FallbackImage;
          }}
        />

        <Username>{nickname}</Username>
        <StatRow>🥇 Win: {wins}</StatRow>
        <StatRow>💦 Lose: {losses}</StatRow>
        <StatRow>🏆 Tournamet: {tournamentWins}</StatRow>
      </ModalCard>
    </ModalOverlay>
  );
};

export default UserProfileModal;
