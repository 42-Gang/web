// FriendList - 유저 프로필 클릭 시 모달

module.exports = function handleUserInfo(socket) {
  socket.on("get_user_info", (nickname) => {
    console.log("📩 [Mock] 사용자 정보 요청:", nickname);

    const userMockData = {
      PONG: {
        nickname: "PONG",
        avatar: "/assets/image/BasicProfile1.png",
        wins: 10,
        losses: 5,
        tournamentWins: 3,
      },
      JACK: {
        nickname: "JACK",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Example_image.png/320px-Example_image.png",
        wins: 7,
        losses: 8,
        tournamentWins: 1,
      },
      GANG: {
        nickname: "GANG",
        avatar: "/assets/image/BasicProfile2.png", // 로컬에 있는 이미지로 가정
        wins: 4,
        losses: 9,
        tournamentWins: 0,
      },
      PING: {
        nickname: "PING",
        avatar: "/assets/image/BasicProfile2.png",
        wins: 8,
        losses: 6,
        tournamentWins: 2,
      },
    };

    const data = userMockData[nickname];

    if (data) {
      socket.emit("user_info", {
        status: "success",
        code: 200,
        message: "User information retrieved successfully",
        data,
      });
    } else {
      socket.emit("user_info", {
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
  });
};
