import React from "react";
import { User } from "../types/User.ts";
import UserProfileCard from "../components/UserProfileCard";
import {
  Container,
  WinnerWrapper,
  WinnerText,
  VsText,
} from "./FinalResultDisplay.styles.ts";

interface FinalResultDisplayProps {
  winner: User;
  loser: User;
  size?: number;
  gap?: number;
}

const FinalResultDisplay: React.FC<FinalResultDisplayProps> = ({
  winner,
  loser,
  size = 70,
  gap = 30,
}) => {
  return (
    <Container gap={gap}>
      <WinnerWrapper>
        <WinnerText>WINNER!</WinnerText>
        <UserProfileCard user={winner} size={size} />
      </WinnerWrapper>
      <VsText>VS</VsText>
      <UserProfileCard user={loser} size={size} />
    </Container>
  );
};

export default FinalResultDisplay;
