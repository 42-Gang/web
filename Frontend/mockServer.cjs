// mockServer.cjs
const { Server } = require("socket.io");
const io = new Server(8080, {
  cors: {
    origin: "*", // 테스트 시 허용
  },
});

console.log("🎮 Mock Socket.IO server running on ws://localhost:8080");

io.on("connection", (socket) => {
  console.log("👋 Client connected");

  socket.on("send", (message) => {
    console.log("📩 Received message:", message);

    const { category, resource, data } = message;

    // 게임 준비 처리
    if (category === "game" && resource === "ready") {
      const response = {
        action: "receive",
        category: "game",
        resource: "ready",
        data: {
          tournament_id: data.tournament_id,
          match_id: data.match_id,
          user_id: data.user_id || 20,
          status: "success",
          message: "준비 완료",
        },
      };
      // 해당 클라이언트에게 응답 전송 (broadcast도 가능)
      socket.emit("receive", response);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});
