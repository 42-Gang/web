import { io } from "socket.io-client";
import { getAccessToken } from "../../mock/utils/token";

export const socket = io(`${import.meta.env.VITE_BACKEND_SOCKET_URL}/chat`, {
  path: "/socket.io",
  transports: ["websocket", "polling"],
  auth: (cb) => {
    cb({ token: getAccessToken() });
  },
});
