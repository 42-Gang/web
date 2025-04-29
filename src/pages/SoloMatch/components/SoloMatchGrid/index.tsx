import React from "react";
import UserProfileCard from "../../../Tournament/components/UserProfileCard";
import VsText from "../../../Tournament/components/\bVsText/\bindex.tsx";
import { GridWrapper } from "./SoloMatchGrid.styles.ts";

interface Props {
  leftUser: any;
  rightUser: any;
  readyStates: { [userId: number]: boolean };
  size?: number;
  winnerId?: number | null;
}

const SoloMatchGrid = ({
  leftUser,
  rightUser,
  readyStates,
  size = 70,
  winnerId,
}: Props) => {
  return (
    <GridWrapper>
      <UserProfileCard
        user={leftUser}
        isReady={readyStates[leftUser.id]}
        isWinner={leftUser.id === winnerId}
        size={size}
      />
      <VsText />
      <UserProfileCard
        user={rightUser}
        isReady={readyStates[rightUser.id]}
        isWinner={rightUser.id === winnerId}
        size={size}
      />
    </GridWrapper>
  );
};

export default SoloMatchGrid;
