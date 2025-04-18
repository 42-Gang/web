// FriendList - 1:1 채팅 (확장 버전: 상대방에게도 메시지 전달)
module.exports = function handleFriendChat(
  io,
  socket,
  userToSocketMap,
  chatHistoryMap
) {
  const blockedUsers = new Set();

  // 유저 ID 등록
  socket.on("register", ({ userId }) => {
    userToSocketMap[userId] = socket.id;
    console.log(`✅ 사용자 등록됨: ${userId} → ${socket.id}`);
  });

  // DM 메시지 수신
  socket.on("send", (msg) => {
    const { action, resource, data } = msg;

    if (action === "send" && resource === "direct_message") {
      console.log("📩 [Mock Server] DM 메시지 수신:", data);

      const { roomId, contents, senderId, receiverId, senderNickname } = data;
      if (!roomId || !senderId || !receiverId) {
        socket.emit("receive", {
          status: "error",
          action,
          resource,
          code: 400,
          message: "요청이 유효하지 않습니다.",
        });
        return;
      }

      const isBlocked = blockedUsers.has(`${receiverId}-${senderId}`);
      if (isBlocked) {
        socket.emit("receive", {
          status: "error",
          action,
          resource,
          code: 403,
          message: "상대방에게 차단되어 메시지를 보낼 수 없습니다.",
        });
        return;
      }

      // 1. 메시지 구조 만들기
      const message = {
        id: Date.now(),
        roomId: String(roomId),
        userId: Number(senderId),
        nickname: senderNickname,
        message: contents,
        time: new Date().toISOString(),
      };

      // 2. 채팅 히스토리에 저장
      if (!chatHistoryMap[roomId]) {
        chatHistoryMap[roomId] = [];
      }
      chatHistoryMap[roomId].push(message);

      // 3. 클라이언트에 메시지 전송 (보낸 사람 + 수신자)
      const responseMessage = {
        action: "recieve",
        resource: "direct_message",
        data: {
          roomId: message.roomId,
          contents: message.message,
          senderId: message.userId,
          nickname: message.nickname,
          time: message.time,
        },
      };

      socket.emit("receive", responseMessage);

      const targetSocketId = userToSocketMap[receiverId];
      if (targetSocketId) {
        io.to(targetSocketId).emit("receive", responseMessage);
        console.log(`📤 [Mock Server] ${receiverId}에게 메시지 전송됨`);
      } else {
        console.log(`⚠️ [Mock Server] ${receiverId} 소켓 미등록 상태`);
      }
    }
  });

  // 차단 요청
  socket.on("block_friend", ({ userId, targetId }) => {
    blockedUsers.add(`${userId}-${targetId}`);
    console.log(`🚫 ${userId}가 ${targetId}를 차단함`);
    socket.emit("block_response", {
      status: "success",
      code: 200,
      message: "Friend has been blocked successfully",
    });
  });

  // 차단 해제 요청
  socket.on("unblock_friend", ({ userId, targetId }) => {
    blockedUsers.delete(`${userId}-${targetId}`);
    console.log(`✅ ${userId}가 ${targetId} 차단 해제함`);
    socket.emit("unblock_response", {
      status: "success",
      code: 200,
      message: "Friend has been unblocked successfully",
    });
  });

  // 연결 해제 시 매핑 제거
  socket.on("disconnect", () => {
    for (const userId in userToSocketMap) {
      if (userToSocketMap[userId] === socket.id) {
        delete userToSocketMap[userId];
        console.log(`❌ 연결 해제됨: ${userId}`);
        break;
      }
    }
  });
};
