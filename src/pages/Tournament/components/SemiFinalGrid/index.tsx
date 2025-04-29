import React from "react";
import { User } from "../../types/User.ts";
import UserProfileCard from "../UserProfileCard";
import { GridWrapper } from "./SemiFinalGrid.styles.ts";

interface SemiFinalGridProps {
  users: User[];
  readyStates: { [userId: number]: boolean };
  gameEnded?: boolean;
  finalWinnerId?: number;
}

const SemiFinalGrid: React.FC<SemiFinalGridProps> = ({
  users,
  readyStates,
  gameEnded = false,
  finalWinnerId,
}) => {
  return (
    <GridWrapper>
      {users.map((user) => (
        <UserProfileCard
          key={user.id}
          user={user}
          isReady={readyStates[user.id]}
          isWinner={gameEnded && user.id === finalWinnerId}
        />
      ))}
    </GridWrapper>
  );
};

export default SemiFinalGrid;
