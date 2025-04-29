import React, { useState } from "react";
import Tournament from "./Tournament.tsx";
import { useNavigate } from "react-router-dom";

// styles
import {
  Wrapper,
  ProfileOverlay,
  LineWrapper,
  VsTextWrapper,
  ExitImage,
  ExitButtonWrapper,
} from "./Matching.ts";

// components
import SemiFinalGrid from "./components/SemiFinalGrid";
import FourUsersGrid from "./components/FourUsersGrid";
import MatchLines from "./components/MatchLines.tsx";
import VsText from "./components/\bVsText/\bindex.tsx";
import { CustomToastContainer, ToastStyle } from "../../styles/toastStyles.ts";

// Images
import BasicProfile1 from "../../assets/image/BasicProfile1.png";
import BasicProfile2 from "../../assets/image/BasicProfile2.png";
import ExitButtonImg from "../../assets/image/ExitButton.png";

// etc
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 임시 유저 데이터
const mockUsers = [
  { id: 1, name: "PONG", profileImage: BasicProfile1 },
  { id: 2, name: "DING", profileImage: BasicProfile2 },
  { id: 3, name: "PING", profileImage: BasicProfile1 },
  { id: 4, name: "DONG", profileImage: BasicProfile2 },
];

const mockWinners = [
  { id: 3, name: "PING", profileImage: BasicProfile1 },
  { id: 2, name: "DING", profileImage: BasicProfile2 },
];

const currentUserId = 3;

const Matching = () => {
  const [readyStates, setReadyStates] = useState<{ [userId: number]: boolean }>(
    {}
  );

  const [gameEnded, setGameEnded] = useState(false);
  const [finalWinner, setFinalWinner] = useState<null | (typeof mockUsers)[0]>(
    null
  );

  const navigate = useNavigate();

  const handleReceiveReady = (data: { user_id: number }) => {
    setReadyStates((prev) => ({
      ...prev,
      [data.user_id]: true,
    }));
  };

  const handleReadyClick = () => {
    // 본인 Ready 처리 (PING)
    handleReceiveReady({ user_id: currentUserId });
    // 상대방 Ready 처리 (DING) → 1초 후
    setTimeout(() => {
      const opponentId = 2;
      handleReceiveReady({ user_id: opponentId });
      // Toast 띄우기
      setTimeout(() => {
        toast.success("🏓 곧 게임이 시작됩니다!", {
          position: "top-center",
          autoClose: 2000,
        });
        // 3초 뒤 게임 화면으로 이동
        setTimeout(() => {
          navigate("/GameScreen");
        }, 3000);
      }, 100); // 테두리 반영 여유 시간
    }, 1000);
  };

  return (
    <Wrapper>
      <ProfileOverlay>
        <LineWrapper>
          <SemiFinalGrid
            users={mockWinners}
            readyStates={readyStates}
            gameEnded={gameEnded}
            finalWinnerId={finalWinner?.id}
          />
          <VsTextWrapper>
            <VsText />
          </VsTextWrapper>
          <MatchLines
            winnerId={mockWinners[0].id}
            leftUserId={mockUsers[2].id}
            rightUserId={mockUsers[0].id}
            direction="left"
          />
          <MatchLines
            winnerId={mockWinners[1].id}
            leftUserId={mockUsers[1].id}
            rightUserId={mockUsers[3].id}
            direction="right"
          />
          <FourUsersGrid users={mockUsers} />
        </LineWrapper>
      </ProfileOverlay>
      <Tournament
        onReadyClick={handleReadyClick}
        customButton={
          gameEnded ? (
            <ExitButtonWrapper onClick={() => navigate("/Home")}>
              <ExitImage src={ExitButtonImg} alt="Exit" />
            </ExitButtonWrapper>
          ) : undefined
        }
      />
      <CustomToastContainer
        position="top-center"
        autoClose={2000}
        toastClassName="custom-toast"
        style={{ marginLeft: "10px" }}
      />
      <ToastStyle />
    </Wrapper>
  );
};

export default Matching;
