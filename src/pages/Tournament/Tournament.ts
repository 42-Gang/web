import styled from "styled-components";
import ReadyButtonImage from "../../assets/image/ReadyButton.png";

export const TournamentContainer = styled.div`
  width: 530px; /* 800px - 채팅창 너비(270px) */
  height: 600px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  left: 0;
  top: 0;
  padding: 20px;
`;

export const TournamentTitle = styled.h1`
  font-family: "Sixtyfour", sans-serif;
  font-size: 30px;
  letter-spacing: 2px;
  color: white;
  margin: 30px auto 0 auto;
  text-align: center;
  transform: translateX(1px);
`;

export const ChatContainer = styled.div`
  width: 290px;
  height: 600px;
  background-color: #fd906f;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
`;

export const ChatHeader = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin: 5px 10px;
  text-align: left;
`;

export const ChatMessage = styled.div`
  font-size: 16px;
  margin: 5px 10px;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  bottom: -3px;
  background-color: #fd906f;
  padding: 5px;
  border-radius: 5px;
  opacity: 1;
  box-shadow: none;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 2px solid #000000;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
`;

export const SendButton = styled.button`
  margin-left: 6px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff6b6b;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e55b5b;
  }
`;

export const ChatScrollArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const ReadyButton = styled.button`
  position: absolute;
  bottom: -10px;
  left: 46%;
  transform: translateX(-50%);
  width: 150px;
  height: 80px;
  background-image: url(${ReadyButtonImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ExitButton = styled.button`
  position: absolute;
  top: 16px;
  left: 7px;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    opacity: 0.8;
  }
`;
