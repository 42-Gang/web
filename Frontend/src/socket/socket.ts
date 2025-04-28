import { io, Socket } from "socket.io-client";
import { getAccessToken } from "../../mock/utils/token";

const URL = `${import.meta.env.VITE_BACKEND_SOCKET_URL}/chat`;

declare global {
  interface Window {
    __socketInstance__?: Socket;
  }
}

if (!window.__socketInstance__) {
  const socket = io(URL, {
    autoConnect: true,
    path: "/socket.io",
    transports: ["websocket", "polling"],
    auth: {
      token: getAccessToken(),
    },
  });

  socket.io.on("reconnect_attempt", () => {
    const token = getAccessToken();
    (socket.io.opts as any).auth = { token };

    console.log("🔄 [socket] reconnect_attempt - 토큰 갱신됨", token);
  });

  window.__socketInstance__ = socket;
}

export const socket = window.__socketInstance__ as Socket;
(window as any).socket = socket;
