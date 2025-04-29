import React, { useState, useEffect, useRef } from "react";
import ExitIcon from "../../assets/image/TournamentExitButton.svg";
import GlobalStyle from "../../styles/GlobalStyles.ts";
import { useNavigate } from "react-router-dom";

import {
  TournamentContainer,
  TournamentTitle,
  ChatContainer,
  ChatHeader,
  ChatMessage,
  ChatInputContainer,
  ChatInput,
  ChatScrollArea,
  SendButton,
  ReadyButton,
  ExitButton,
} from "./Tournament.ts";

interface TournamentProps {
  onReadyClick?: () => void;
  customButton?: React.ReactNode;
  showTitle?: boolean;
  titleText?: string;
}

// 예제 채팅 데이터 (나중에 API로 대체)
const mockMessages = [
  { id: 1, user: "Ping", message: "시작해" },
  { id: 2, user: "Pong", message: "오키" },
];

const Tournament: React.FC<TournamentProps> = ({
  onReadyClick,
  customButton,
  showTitle,
  titleText,
}) => {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, user: "TestUser", message: inputValue },
      ]);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <GlobalStyle />
      <TournamentContainer>
        <ExitButton onClick={() => navigate("/Home")} aria-label="Exit to home">
          <img src={ExitIcon} alt="Exit" />
        </ExitButton>
        {showTitle !== false && (
          <TournamentTitle>{titleText ?? "Tournament"}</TournamentTitle>
        )}

        {customButton ?? <ReadyButton onClick={onReadyClick} />}
      </TournamentContainer>

      <ChatContainer>
        <ChatHeader>Chat</ChatHeader>
        <ChatScrollArea>
          {messages.map((msg) => (
            <ChatMessage key={msg.id}>
              <strong>{msg.user}:</strong> {msg.message}
            </ChatMessage>
          ))}
          <div ref={chatEndRef} />
        </ChatScrollArea>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </ChatInputContainer>
      </ChatContainer>
    </>
  );
};

export default Tournament;
