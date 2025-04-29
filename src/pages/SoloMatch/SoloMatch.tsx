import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomToastContainer, ToastStyle } from "../../styles/toastStyles.ts";

import Tournament from "../Tournament/Tournament.tsx";
import SoloMatchGrid from "./components/SoloMatchGrid";
import { OverlayWrapper } from "./SoloMatch.ts";

import BasicProfile1 from "../../assets/image/BasicProfile1.png";
import BasicProfile2 from "../../assets/image/BasicProfile2.png";

const mockUsers = {
  pong: { id: 1, name: "PONG", profileImage: BasicProfile1 },
  ping: { id: 2, name: "PING", profileImage: BasicProfile2 },
};

const SoloMatch = () => {
  const [readyStates, setReadyStates] = useState<{ [userId: number]: boolean }>(
    {}
  );
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const toastShownRef = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stateWinnerId = location.state?.winnerId;
    if (typeof stateWinnerId === "number") {
      setWinnerId(stateWinnerId);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleReceiveReady = (userId: number) => {
    setReadyStates((prev) => ({
      ...prev,
      [userId]: true,
    }));
  };

  const handleReadyClick = () => {
    handleReceiveReady(mockUsers.pong.id);
    setTimeout(() => {
      handleReceiveReady(mockUsers.ping.id);
    }, 2000);
  };

  useEffect(() => {
    const allReady = Object.values(mockUsers).every(
      (user) => readyStates[user.id]
    );

    if (allReady && !toastShownRef.current) {
      toastShownRef.current = true;
      toast.success("🏓 곧 게임이 시작됩니다!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/GameScreen");
      }, 3000);
    }
  }, [readyStates, navigate]);

  return (
    <>
      <OverlayWrapper>
        <SoloMatchGrid
          leftUser={mockUsers.pong}
          rightUser={mockUsers.ping}
          readyStates={readyStates}
          size={90}
          winnerId={winnerId}
        />
      </OverlayWrapper>
      <Tournament onReadyClick={handleReadyClick} titleText="1 vs 1" />
      <CustomToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="custom-toast"
        style={{ marginLeft: "10px" }}
      />
      <ToastStyle />
    </>
  );
};

export default SoloMatch;
