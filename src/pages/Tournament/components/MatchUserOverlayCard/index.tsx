import React from "react";
import UserProfileCard from "../UserProfileCard";
import {
  OverlayWrapper,
  DimmedOverlay,
  GameIconOverlay,
} from "./MatchUserOverlayCard.styles.ts";

interface Props {
  user: any;
  size: number;
  isReady: boolean;
  isInGame?: boolean;
  iconSrc?: string;
  isWinner?: boolean;
}

const MatchUserOverlayCard = ({
  user,
  size,
  isReady,
  isInGame = false,
  iconSrc,
  isWinner = false,
}: Props) => {
  return (
    <OverlayWrapper>
      <UserProfileCard
        user={user}
        size={size}
        isReady={isReady}
        isWinner={isWinner}
      />
      {isInGame && iconSrc && (
        <>
          <DimmedOverlay />
          <GameIconOverlay src={iconSrc} alt="Playing Icon" />
        </>
      )}
    </OverlayWrapper>
  );
};

export default MatchUserOverlayCard;
