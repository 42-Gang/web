import React from "react";
import { User } from "../../types/User.ts";
import {
  Wrapper,
  ProfileImage,
  Name,
  WinnerText,
} from "./UserProfileCard.styles.ts";

interface UserProfileCardProps {
  user: User;
  size?: number;
  isReady?: boolean;
  isWinner?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  size = 70,
  isReady = false,
  isWinner = false,
}) => {
  return (
    <Wrapper>
      <div style={{ position: "relative", width: size, height: size }}>
        {isWinner && <WinnerText>WINNER!</WinnerText>}
        <div style={{ position: "relative", width: size, height: size }}>
          <ProfileImage
            src={user.profileImage}
            alt={user.name}
            width={size}
            height={size}
            isReady={isReady}
          />
        </div>
      </div>
      <Name>{user.name}</Name>
    </Wrapper>
  );
};

export default UserProfileCard;
