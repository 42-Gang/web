import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(171, 170, 170, 0.83);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  background-color: black;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  z-index: 1001;
  overflow: hidden;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 1005;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalTitle = styled.p`
  font-family: "Sixtyfour", sans-serif;
  font-size: 25px;
  color: white;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  z-index: 1002;
  position: relative;
`;

export const InviteButtonContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 31%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  z-index: 100;
`;

export const MatchupRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 65px;
`;

export const InviteButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const VSWrapper = styled.div`
  font-family: "Sixtyfour", sans-serif;
  font-size: 24px;
  color: red;
  text-align: center;
  margin: 0 10px;
`;

export const InviteButton = styled.button<{ $isAccepted?: boolean }>`
  width: 120px;
  height: 120px;
  cursor: ${(props) => (props.$isAccepted ? "default" : "pointer")};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 9999;

  &:hover,
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;

export const InviteButtonImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
`;

export const InviteUserName = styled.p`
  margin-top: 10px;
  font-family: "Sixtyfour", sans-serif;
  font-size: 16px;
  color: white;
  text-align: center;
`;

export const FriendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 10px;
  border-bottom: 2px solid white;
  margin-top: -8px;
  padding-bottom: 15px;
`;

export const FriendProfileImage = styled.img<{ $isReady: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: ${(props) => (props.$isReady ? "3px solid green" : "none")};
`;

export const ReadyProfileImage = styled(FriendProfileImage)<{
  $isReady: boolean;
}>`
  border: 3px solid ${(props) => (props.$isReady ? "red" : "green")};
  transition: border 0.3s ease-in-out;
  outline: none;

  &:hover,
  &:focus {
    outline: none;
  }
`;

export const FriendName = styled.p`
  font-family: "Sixtyfour", sans-serif;
  font-size: 18px;
  color: white;
  text-align: left;
  flex-grow: 1;
  margin-left: 15px;
`;

export const InviteGameButton = styled.button<{
  isInvited: boolean;
  isLoading: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  border: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: ${(props) => (props.isLoading ? "1" : "0.8")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const FriendListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  overflow-y: auto;
  padding: 10px;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 0;
    min-height: 30px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
  }
`;

export const ToastStyle = {
  width: "270px",
  fontSize: "15px",
  padding: "15px",
  textAlign: "center" as const,
  backgroundColor: "#222",
  color: "white",
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  gap: "10px",
};

export const LoadingIndicator = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid white;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// 모두 다 Ready
export const WideToastStyle = {
  fontFamily: "'Sixtyfour', sans-serif",
  fontSize: "14px",
  backgroundColor: "#222",
  color: "#fff",
  borderRadius: "12px",
  padding: "12px 18px",
  minWidth: "360px",
};

export const MiniStatsPopup = styled.div`
  position: absolute;
  top: -60px;
  background-color: white;
  color: black;
  padding: 6px 10px;
  border-radius: 8px;
  font-family: "Sixtyfour", sans-serif;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  z-index: 1000;
`;
