import React from "react";
import { Wrapper, Avatar, Name, StatusDot } from "./FriendListItem.styles";

interface FriendListItemProps {
  name: string;
  isOnline: boolean;
  profileImage: string;
  onClick?: () => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({
  name,
  isOnline,
  profileImage,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Avatar src={profileImage} alt="profile" />
      <Name>{name}</Name>
      <StatusDot isOnline={isOnline} />
    </Wrapper>
  );
};

export default FriendListItem;
