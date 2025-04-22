import { io } from "socket.io-client";
import { getAccessToken } from "../../mock/utils/token";

export const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
  path: "/socket.io",
  transports: ["websocket", "polling"],

  // 최신 access token을 socket 연결마다 자동 반영 (token-auth로 전달중)
  // cb : callback
  // WebSocket의 인증용 handshake시 서버로 전달
  auth: (cb) => {
    cb({ token: getAccessToken() });
  },
});
