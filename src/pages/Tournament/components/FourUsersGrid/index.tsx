import React from "react";
import { User } from "../../types/User.ts";
import UserProfileCard from "../UserProfileCard";
import { GridWrapper } from "./FourUsersGrid.styles.ts";

interface FourUsersGridProps {
  users: User[];
}

const FourUsersGrid: React.FC<FourUsersGridProps> = ({ users }) => {
  return (
    <GridWrapper>
      {users.map((user) => (
        <UserProfileCard key={user.id} user={user} />
      ))}
    </GridWrapper>
  );
};

export default FourUsersGrid;
