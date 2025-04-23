import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../socket/socket.ts";
import { fetchChatHistory } from "../../api/chat.ts";

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
import UserProfileModal from "./components/UserProfileModal.tsx";

import profile1 from "../../assets/image/BasicProfile1.png";
import profile2 from "../../assets/image/BasicProfile2.png";
import BlockImage from "../../assets/image/Block.png";
import UnblockImage from "../../assets/image/Unblock.png";
import cancelButton from "../../assets/image/CancelButton1.svg";

import { blockFriend, unblockFriend } from "../../api/friends";

interface ChatData {
  id: number;
  senderId: string;
  nickname: string;
  message: string;
}

interface UserInfo {
  nickname: string;
  avatar: string;
  wins: number;
  losses: number;
  tournamentWins: number;
}

console.log("✨ 소켓 주소:", import.meta.env.VITE_BACKEND_SOCKET_URL);

const FriendChatRoom: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const roomId = params.roomId || "room-1";
  const searchParams = new URLSearchParams(location.search);

  const MY_USER_ID = searchParams.get("userId") || "1";
  const MY_NICKNAME = MY_USER_ID === "1" ? "PONG" : "PING";
  const CHAT_PARTNER_ID = MY_USER_ID === "1" ? "2" : "1";
  const CHAT_PARTNER_NICKNAME = MY_USER_ID === "1" ? "PING" : "PONG";

  const [messages, setMessages] = useState<ChatData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [chatPartnerInfo, setChatPartnerInfo] = useState<UserInfo | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. 소켓 등록 및 상대방 프로필 요청
  useEffect(() => {
    const handleRegister = () => {
      console.log("✅ [Socket] 연결됨:", socket.id);
      socket.emit("register", { userId: MY_USER_ID });
      socket.emit("get_user_info", CHAT_PARTNER_NICKNAME);
    };

    if (socket.connected) {
      handleRegister();
    } else {
      socket.on("connect", handleRegister);
    }

    return () => {
      socket.off("connect", handleRegister);
    };
  }, [MY_USER_ID, CHAT_PARTNER_NICKNAME]);

  // 2. 채팅 기록 불러오기 (REST API)
  useEffect(() => {
    const loadHistory = async () => {
      const history = await fetchChatHistory(roomId);
      setMessages(history);
    };

    loadHistory();
  }, [roomId]);

  // 3. 사용자 정보 수신 → 분리 저장
  useEffect(() => {
    socket.on("user_info", (res) => {
      if (res.status === "success") {
        const user = res.data;
        if (user.nickname === CHAT_PARTNER_NICKNAME) {
          setChatPartnerInfo(user);
        } else {
          setSelectedUser(user);
        }
      } else {
        console.warn("❌ 사용자 정보 요청 실패:", res.message);
      }
    });

    return () => {
      socket.off("user_info");
    };
  }, [CHAT_PARTNER_NICKNAME]);

  // 4. 실시간 메시지 수신
  useEffect(() => {
    socket.on("message", (msg) => {
      if (
        msg.action === "receive" &&
        msg.resource === "direct_message" &&
        msg.data.roomId === roomId
      ) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            senderId: msg.data.senderId,
            nickname: msg.data.nickname,
            message: msg.data.contents,
          },
        ]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [roomId]);

  // 5. 메시지 전송
  const handleSend = () => {
    if (isBlocked) {
      alert("⚠️ 차단한 사용자에게 메시지를 보낼 수 없습니다! ⚠️");
      return;
    }

    if (inputValue.trim() === "") return;

    const payload = {
      action: "send",
      resource: "direct_message",
      data: {
        roomId,
        contents: inputValue,
        senderId: MY_USER_ID,
        receiverId: CHAT_PARTNER_ID,
        senderNickname: MY_NICKNAME,
      },
    };

    console.log("전송 시도:", payload);
    socket.emit("message", payload);
    setInputValue("");
  };

  // 6. 친구 목록 클릭 시 모달용 프로필 요청
  const handleFriendClick = (nickname: string) => {
    socket.emit("get_user_info", nickname);
  };

  // 7. 차단 / 차단 해제
  const toggleBlock = async () => {
    try {
      if (isBlocked) {
        await unblockFriend(CHAT_PARTNER_ID);
        setIsBlocked(false);
      } else {
        await blockFriend(CHAT_PARTNER_ID);
        setIsBlocked(true);
      }
    } catch (err: any) {
      alert(`⚠️ ${err.message || "차단 요청 중 오류 발생"}`);
    }
  };

  // 8. 스크롤 항상 맨 아래로
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const avatarSrc =
    chatPartnerInfo?.avatar && chatPartnerInfo.avatar.startsWith("/")
      ? profile2
      : chatPartnerInfo?.avatar || profile2;

  return (
    <PageContainer>
      <BackButton
        src={cancelButton}
        alt="뒤로 가기"
        onClick={() => navigate("/FriendList")}
      />

      <ChatUserProfileWrapper>
        <ChatUserImage src={avatarSrc} alt="상대방 프로필" />
        <ChatUserNameText>
          {chatPartnerInfo?.nickname || CHAT_PARTNER_NICKNAME}
        </ChatUserNameText>
      </ChatUserProfileWrapper>

      {isBlocked ? (
        <UnblockButton src={UnblockImage} alt="Unblock" onClick={toggleBlock} />
      ) : (
        <BlockButton src={BlockImage} alt="Block" onClick={toggleBlock} />
      )}

      <ChatBox>
        <ChatMessages>
          {messages.map((msg) => (
            <ChatMessage key={msg.id}>
              <strong>{msg.nickname}:</strong> {msg.message}
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
            placeholder="Type a message..."
          />
          <SendButton onClick={handleSend}>Send</SendButton>
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

      {selectedUser && (
        <UserProfileModal
          nickname={selectedUser.nickname}
          avatar={selectedUser.avatar}
          wins={selectedUser.wins}
          losses={selectedUser.losses}
          tournamentWins={selectedUser.tournamentWins}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </PageContainer>
  );
};

export default FriendChatRoom;
