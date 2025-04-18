import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "../../socket/socket.ts";
import styled from "styled-components";

import Tournament from "./Tournament.tsx";
import {
  InviteButtonContainer,
  MatchupRow,
  InviteButtonWrapper,
  InviteButton,
  InviteUserName,
  VSWrapper,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalCloseButton,
  FriendRow,
  FriendName,
  InviteGameButton,
  FriendListContainer,
  LoadingIndicator,
  ToastStyle,
  WideToastStyle,
} from "./Invitation";
import ModalCancel from "../../assets/image/ModalCancel.svg";
import FriendIcon from "../../assets/image/BasicProfile2.png";
import InviteButtonIcon from "../../assets/image/InviteButton.svg";
import InvitedButtonIcon from "../../assets/image/InvitedButton.svg";
import DefaultProfile from "../../assets/image/BasicProfile1.png";

const friends = [
  { id: 1, name: "PANG", imageUrl: DefaultProfile },
  { id: 2, name: "GANG", imageUrl: FriendIcon },
  { id: 3, name: "PING", imageUrl: FriendIcon },
  { id: 4, name: "PONG", imageUrl: FriendIcon },
];

const StyledInviteGameButton = styled(InviteGameButton)`
  margin-left: auto;
`;

const SmallLoadingIndicator = styled(LoadingIndicator)`
  width: 23px;
  height: 23px;
`;

const ReadyProfileImage = styled.img<{ $isReady: boolean }>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid ${(props) => (props.$isReady ? "green" : "red")};
  transition: border 0.3s ease-in-out;
  outline: none;

  &:hover,
  &:focus {
    outline: none;
  }
`;

const Invitation = () => {
  const MY_USER_ID = 1;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(new Set<number>());
  const [invitedFriends, setInvitedFriends] = useState<number[]>([]);
  const [acceptedFriends, setAcceptedFriends] = useState<number[]>([1]);
  const [isReadyList, setIsReadyList] = useState<{ [userId: number]: boolean }>(
    {
      1: false,
      2: false,
      3: false,
      4: false,
    }
  );

  const [hoveredUser, setHoveredUser] = useState<{
    userId: number;
    wins: number;
    losses: number;
  } | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInviteClick = (friendId: number) => {
    if (!invitedFriends.includes(friendId) && !loadingFriends.has(friendId)) {
      setInvitedFriends((prev) => [...prev, friendId]);
      setLoadingFriends((prev) => new Set(prev).add(friendId));

      toast.success(
        <>
          🏓 초대가 완료되었습니다 🏓
          <br />
          상대방의 응답을 기다리는 중...
        </>,
        {
          position: "top-right",
          autoClose: 1000,
          style: ToastStyle,
          draggable: true,
        }
      );

      setTimeout(() => {
        setLoadingFriends((prev) => {
          const newSet = new Set(prev);
          newSet.delete(friendId);
          return newSet;
        });
        setInvitedFriends((prev) => prev.filter((id) => id !== friendId));
      }, 5000);
    }
  };

  const handleReadyClick = () => {
    setIsReadyList((prev) => ({
      ...prev,
      [MY_USER_ID]: true,
    }));

    socket.emit("send", {
      action: "send",
      category: "game",
      resource: "ready",
      data: {
        tournament_id: 135,
        match_id: 737,
        user_id: MY_USER_ID,
      },
    });
  };

  useEffect(() => {
    socket.on("receive", (msg) => {
      if (
        msg.category === "game" &&
        msg.resource === "ready" &&
        msg.data?.status === "success"
      ) {
        const readyUserId = msg.data.user_id;
        setIsReadyList((prev) => ({
          ...prev,
          [readyUserId]: true,
        }));

        toast.success(`${msg.data.user_id}번 유저 준비 완료!`, {
          position: "top-right",
          autoClose: 1500,
          style: ToastStyle,
        });
      }
    });

    return () => {
      socket.off("receive");
    };
  }, []);

  // 모든 유저 준비 시 페이지 이동
  useEffect(() => {
    const allReady = Object.values(isReadyList).every((v) => v);

    if (allReady) {
      toast.info(
        <>
          🎉 모든 유저가 준비되었습니다.
          <br />곧 토너먼트 대진을 확인할 수 있습니다!
        </>,
        {
          autoClose: 3000,
          style: WideToastStyle,
        }
      );

      setTimeout(() => {
        navigate("/tournamentmain");
      }, 3000);
    }
  }, [isReadyList, navigate]);

  // ✅ 사용자 정보 수신 (hover 시)
  useEffect(() => {
    socket.on("user_info", (res) => {
      if (res.status === "success") {
        const { nickname, wins, losses } = res.data;
        const found = friends.find((f) => f.name === nickname);
        if (found) {
          setHoveredUser({
            userId: found.id,
            wins,
            losses,
          });
        }
      }
    });

    return () => {
      socket.off("user_info");
    };
  }, []);

  const handleHover = (friendName: string) => {
    socket.emit("get_user_info", friendName);
  };

  return (
    <>
      <Tournament onReadyClick={handleReadyClick} />

      {!isModalOpen && (
        <InviteButtonContainer>
          {[0, 2].map((startIndex) => (
            <MatchupRow key={startIndex}>
              {friends
                .slice(startIndex, startIndex + 2)
                .map((friend, index) => {
                  const isSelf = friend.id === MY_USER_ID;

                  return (
                    <React.Fragment key={friend.id}>
                      <InviteButtonWrapper>
                        <InviteButton
                          onMouseEnter={
                            !isSelf ? () => handleHover(friend.name) : undefined
                          }
                          onMouseLeave={() => setHoveredUser(null)}
                          disabled={isSelf}
                        >
                          {!isSelf && hoveredUser?.userId === friend.id && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-60px",
                                background: "#000",
                                color: "#fff",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontFamily: "'Sixtyfour', sans-serif",
                                zIndex: 3000,
                                whiteSpace: "nowrap",
                              }}
                            >
                              🏆 Win: {hoveredUser.wins} <br />
                              💥 Lose: {hoveredUser.losses}
                            </div>
                          )}

                          <ReadyProfileImage
                            src={friend.imageUrl}
                            alt="Profile"
                            $isReady={!!isReadyList[friend.id]}
                          />
                        </InviteButton>
                        <InviteUserName>{friend.name}</InviteUserName>
                      </InviteButtonWrapper>
                      {index === 0 && <VSWrapper>VS</VSWrapper>}
                    </React.Fragment>
                  );
                })}
            </MatchupRow>
          ))}
        </InviteButtonContainer>
      )}

      <ToastContainer />
    </>
  );
};

export default Invitation;
