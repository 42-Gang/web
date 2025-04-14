import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  PageContainer,
  ChatBox,
  ChatMessages,
  ChatMessage,
  ChatInputContainer,
  ChatInput,
  SendButton,
  FriendList,
  BlockButton,
  UnblockButton,
  ChatUserProfileWrapper,
  ChatUserImage,
  ChatUserNameText,
  BackButton,
} from "./FriendChatRoom";
import FriendListItem from "./components/FriendListItem.tsx";
import Divider from "./components/Divider";

import profile1 from "../../assets/image/BasicProfile1.png";
import profile2 from "../../assets/image/BasicProfile2.png";
import BlockImage from "../../assets/image/Block.png";
import UnblockImage from "../../assets/image/Unblock.png";
import cancelButton from "../../assets/image/CancelButton1.svg";

const mockMessages = [
  { id: 1, user: "Pong", message: "안녕하세요" },
  { id: 2, user: "Pong", message: "저희 친해져요" },
  { id: 3, user: "Ping", message: "완전 좋아요. 게임 한 판 ㅋㅋ?" },
  { id: 4, user: "Pong", message: "ㅋㅋ" },
];

const FriendChatRoom: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [isBlocked, setIsBlocked] = useState(true);

  const toggleBlock = () => {
    setIsBlocked((prev) => !prev);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, user: "Me", message: inputValue },
      ]);
      setInputValue("");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFriendClick = (name: string) => {
    alert(`${name}의 채팅방으로 이동합니다.`);
  };

  return (
    <PageContainer>
      <BackButton
        src={cancelButton}
        alt="뒤로 가기"
        onClick={() => navigate("/FriendList")}
      />
      <ChatUserProfileWrapper>
        <ChatUserImage src={profile1} alt="Pong profile" />
        <ChatUserNameText>PONG</ChatUserNameText>
      </ChatUserProfileWrapper>

      {isBlocked ? (
        <BlockButton src={BlockImage} alt="Block 버튼" onClick={toggleBlock} />
      ) : (
        <UnblockButton
          src={UnblockImage}
          alt="Unblock 버튼"
          onClick={toggleBlock}
        />
      )}
      <ChatBox>
        <ChatMessages>
          {messages.map((msg) => (
            <ChatMessage key={msg.id}>
              <strong>{msg.user}:</strong> {msg.message}
            </ChatMessage>
          ))}
          <div ref={chatEndRef} />
        </ChatMessages>
        <ChatInputContainer>
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요..."
          />
          <SendButton type="button" onClick={handleSend}>
            Send
          </SendButton>
        </ChatInputContainer>
      </ChatBox>
      <FriendList>
        <FriendListItem
          name="PONG"
          isOnline={true}
          profileImage={profile1}
          onClick={() => handleFriendClick("PONG")}
        />
        <Divider />
        <FriendListItem
          name="JACK"
          isOnline={false}
          profileImage={profile2}
          onClick={() => handleFriendClick("JACK")}
        />
      </FriendList>
    </PageContainer>
  );
};

export default FriendChatRoom;
