import { WebSocketContext } from './WebSocketContext'
import { useSetRecoilState } from 'recoil'
import { friendStatusAtom } from '../pages/FriendList/components/FriendStatusAtom'
import { useRef } from 'react'

interface FriendStatusPayload {
  friendId: number
  status: 'ONLINE' | 'OFFLINE' | 'GAME' | 'AWAY' | 'LOBBY'
}

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null)
  const setFriendStatus = useSetRecoilState(friendStatusAtom)

  const connect = (accessToken: string) => {
    if (!import.meta.env.VITE_WS_URL) {
      console.error("🚨 WebSocket URL is not set.")
      return
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.warn("⚠️ WebSocket already connected.")
      return
    }

    const socket = new WebSocket(`${import.meta.env.VITE_WS_URL}?token=${accessToken}`)

    socketRef.current = socket

    socket.addEventListener('open', () => {
      console.log("✅ WebSocket connected successfully.")
    });

    // friend-status 이벤트 듣기
    socket.addEventListener('message', (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed.event === 'friend-status') {
          const { friendId, status } = parsed.data as FriendStatusPayload;
          console.log("📨 Friend status update:", friendId, status);

          setFriendStatus((prev) => ({
            ...prev,
            [friendId]: status
          }))
        }
      } catch (error) {
        console.error("🚨 Error parsing message:", error);
      }
    });

    socket.addEventListener('error', (error) => {
      console.error("🚨 WebSocket error:", error);
      localStorage.removeItem("accessToken")
      console.warn("🚪 AccessToken deleted due to WebSocket error.")
      window.location.href = "/"
      socketRef.current?.close();
      socketRef.current = null;
    });

    socket.addEventListener('close', (event) => {
      console.warn("🔌 WebSocket disconnected:", event.reason);
      socketRef.current = null;
    });
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
      console.log("🔌 WebSocket manually disconnected.")
    }
    setFriendStatus({})
  }

  return (
    <WebSocketContext.Provider value={{ connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  )
}
