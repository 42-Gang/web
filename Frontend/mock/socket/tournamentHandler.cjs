// Tournament - 유저 대기 상태
module.exports = function handleTournament(socket) {
  socket.on("send", (msg) => {
    // 여기에서 구조 분해로 꺼내야 함
    const { category, resource, data } = msg;

    if (category === "game" && resource === "ready") {
      const { tournament_id, match_id, user_id } = data;

      // 응답 보내기
      const response = {
        action: "receive",
        category: "game",
        resource: "ready",
        data: {
          tournament_id,
          match_id,
          user_id,
          status: "success",
          message: "준비 완료",
        },
      };

      socket.emit("receive", response);

      // 테스트용: 다른 유저들이 준비한 것처럼 보내기
      const otherUsers = [2, 3, 4].filter((id) => id !== user_id);
      otherUsers.forEach((uid, idx) => {
        setTimeout(() => {
          socket.emit("receive", {
            action: "receive",
            category: "game",
            resource: "ready",
            data: {
              tournament_id,
              match_id,
              user_id: uid,
              status: "success",
              message: "상대방 준비 완료",
            },
          });
        }, 1500 + idx * 1000);
      });
    }
  });
};
