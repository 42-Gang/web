const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

// 서버 세팅
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

const userToSocketMap = {};
const blockStatus = {};
const chatHistoryMap = {};

// 차단 API
app.patch("/friends/:id/block", (req, res) => {
  const userId = req.params.id;
  blockStatus[userId] = true;

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Friend has been blocked successfully",
  });
});

app.patch("/friends/:id/unblock", (req, res) => {
  const userId = req.params.id;
  blockStatus[userId] = false;

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Friend has been unblocked successfully",
  });
});

// 채팅 기록 조회 API
app.get("/v1/chat/:roomId/messages", (req, res) => {
  const { roomId } = req.params;
  const messages = chatHistoryMap[roomId] || [];

  res.status(200).json({
    status: "SUCCESS",
    message: "채팅 기록 조회 성공",
    data: { chatHistory: messages },
    errors: [],
  });
});

// 소켓 핸들러
const tournamentHandler = require("./socket/tournamentHandler.cjs");
const handleUserInfo = require("./socket/UserInfo.cjs");
const handleFriendChat = require("./socket/FriendChat.cjs");

io.on("connection", (socket) => {
  tournamentHandler(socket);
  handleUserInfo(socket);
  handleFriendChat(io, socket, userToSocketMap, chatHistoryMap);
});

// 서버 실행
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🟢 Mock Server running on http://localhost:${PORT}`);
});
