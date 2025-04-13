import styled from "styled-components";

export const PageContainer = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  background-color: #000;
  position: relative;
`;

export const ChatBox = styled.div`
  width: 600px;
  height: 500px;
  background-color: #fd906f;
  display: flex;
  flex-direction: column;
  border-radius: 0px;
  padding: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

export const ChatUserName = styled.div`
  position: absolute;
  color: white;
  top: 55px;
  left: 15px;
  font-weight: bold;
  font-size: 20px;
  z-index: 3;
`;

export const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 0;
`;

export const ChatMessage = styled.div`
  font-size: 14px;
  margin-bottom: 6px;

  strong {
    margin-right: 4px;
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  padding-top: 13px;
  border-top: 3px dotted black;
`;

export const ChatInput = styled.input`
  flex: 1;
  background-color: rgba(255, 252, 252, 0.42);
  padding: 6px;
  font-size: 14px;
  border-radius: 5px;
`;

export const SendButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  font-weight: bold;
  border: none;
  margin-left: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #e55b5b;
  }
`;

export const FriendList = styled.div`
  width: 200px;
  height: 500px;
  background-color: #3c2f2f;
  padding: 10px 10px 20px 10px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

export const FriendItem = styled.div<{ isOnline: boolean }>`
  display: flex;
  align-items: center;
  font-weight: bold;
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ isOnline }) => (isOnline ? "green" : "red")};
    margin-right: 8px;
  }
`;

export const ChatUserProfileWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 15px;
  display: flex;
  align-items: center;
  z-index: 3;
`;

export const ChatUserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const ChatUserNameText = styled.div`
  color: white;
  font-weight: bold;
  font-size: 18px;
  font-family: "Sixtyfour", sans-serif;
  margin-top: 10px;
`;

export const BackButton = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 4;
`;

export const BlockButton = styled.img`
  position: absolute;
  top: 55px;
  left: calc(600px - 97px);

  width: 100px;
  height: 35px;
  object-fit: cover;
  cursor: pointer;
  z-index: 3;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const UnblockButton = styled.img`
  position: absolute;
  top: 52px;
  left: calc(600px - 108px);

  width: 120px;
  height: 42px;
  object-fit: cover;
  cursor: pointer;
  z-index: 3;

  &:hover {
    filter: brightness(0.9);
  }
`;
