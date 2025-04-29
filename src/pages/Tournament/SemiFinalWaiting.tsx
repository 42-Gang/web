import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tournament from "./Tournament.tsx";
import { toast } from "react-toastify";
import { CustomToastContainer, ToastStyle } from "../../styles/toastStyles.ts";
import {
  WaitingWrapper,
  WaitingOverlay,
  WaitingLeftMatchup,
  WaitingRightMatchup,
} from "./SemiFinalWaiting.styles.ts";
import VsText from "./components/\bVsText/\bindex.tsx";
import MatchUserOverlayCard from "./components/MatchUserOverlayCard";
import BasicProfile1 from "../../assets/image/BasicProfile1.png";
import BasicProfile2 from "../../assets/image/BasicProfile2.png";
import DingIcon from "../../assets/image/BlueMask.svg";
import DongIcon from "../../assets/image/RedMask.svg";

// Mock 데이터
const mockUsers = {
  pong: { id: 1, name: "PONG", profileImage: BasicProfile1 },
  ping: { id: 2, name: "PING", profileImage: BasicProfile1 },
  ding: { id: 3, name: "DING", profileImage: BasicProfile2 },
  dong: { id: 4, name: "DONG", profileImage: BasicProfile2 },
};

const currentUserId = 1;

const SemiFinalWaiting = () => {
  const navigate = useNavigate();
  const [readyStates, setReadyStates] = useState<{ [userId: number]: boolean }>(
    {}
  );
  const [opponentInGame, setOpponentInGame] = useState(true); // 상대 경기 중 여부
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const toastShownRef = useRef(false);
  const isWinner = (userId: number) => winnerId !== null && winnerId === userId;

  const handleReadyClick = () => {
    const mockPayload = {
      tournament_id: 135,
      match_id: 888,
      user_id: currentUserId,
    };
    handleReceiveReady(mockPayload.user_id);
  };

  const handleReceiveReady = (userId: number) => {
    setReadyStates((prev) => {
      const updated = {
        ...prev,
        [userId]: true,
      };

      const allReady = Object.values(mockUsers).every(
        (user) => updated[user.id]
      );

      if (allReady && !toastShownRef.current) {
        toastShownRef.current = true;
        toast.success("🏓 곧 게임이 시작됩니다!", {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/GameScreen");
        }, 3000);
      }
      return updated;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleReceiveReady(mockUsers.ding.id);
      handleReceiveReady(mockUsers.ping.id);
      handleReceiveReady(mockUsers.dong.id);

      // 예시로 상대방 경기 종료 및 승자 설정
      // 게임 페이지에서 돌아오는 그 부분을 연동해야 할 것 같아서 주석 처리 (정상 작동하긴 함)
      // setOpponentInGame(false);
      // setWinnerId(mockUsers.ding.id); // ding이 이겼다고 가정
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <WaitingWrapper>
      <Tournament onReadyClick={handleReadyClick} />

      <WaitingOverlay>
        <WaitingLeftMatchup>
          <MatchUserOverlayCard
            user={mockUsers.pong}
            size={70}
            isReady={readyStates[mockUsers.pong.id]}
            isWinner={isWinner(mockUsers.pong.id)}
          />
          <VsText />
          <MatchUserOverlayCard
            user={mockUsers.ping}
            size={70}
            isReady={readyStates[mockUsers.ping.id]}
            isWinner={isWinner(mockUsers.ping.id)}
          />
        </WaitingLeftMatchup>

        <WaitingRightMatchup>
          <MatchUserOverlayCard
            user={mockUsers.ding}
            size={70}
            isReady={readyStates[mockUsers.ding.id]}
            isInGame={opponentInGame}
            iconSrc={DingIcon}
            isWinner={isWinner(mockUsers.ding.id)}
          />
          <VsText />
          <MatchUserOverlayCard
            user={mockUsers.dong}
            size={70}
            isReady={readyStates[mockUsers.dong.id]}
            isInGame={opponentInGame}
            iconSrc={DongIcon}
            isWinner={isWinner(mockUsers.dong.id)}
          />
        </WaitingRightMatchup>
      </WaitingOverlay>
      <CustomToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="custom-toast"
      />
      <ToastStyle />
    </WaitingWrapper>
  );
};

export default SemiFinalWaiting;
