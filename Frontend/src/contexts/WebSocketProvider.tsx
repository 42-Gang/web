// src/contexts/WebSocketProvider.tsx
import { WebSocketContext } from './WebSocketContext' // ✅ Context import
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

    socket.onopen = () => {
      console.log("✅ WebSocket connected successfully.")
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'friend-status') {
          const payload = data.payload as FriendStatusPayload
          console.log("Status update:", payload.friendId, payload.status)

          setFriendStatus((prev: Record<number, FriendStatusPayload['status']>) => ({
            ...prev,
            [payload.friendId]: payload.status
          }))
        }
      } catch (error) {
        console.error("🚨 Error parsing WebSocket message:", error)
      }
    }

    socket.onerror = (error) => {
      console.error("🚨 WebSocket error:", error)

      // 실패 감지 후 자동 로그아웃 처리
      localStorage.removeItem("accessToken")
      console.warn("🚪 AccessToken deleted due to WebSocket error.")

      // 페이지 강제 이동
      window.location.href = "/"

      // 소켓 연결 끊기
      socketRef.current?.close()
      socketRef.current = null
    }

    socket.onclose = (event) => {
      console.warn("🔌 WebSocket disconnected:", event.reason)
      socketRef.current = null
    }

    socketRef.current = socket
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
      console.log("🔌 WebSocket manually disconnected.")
    }

    // 친구 상태 초기화
    setFriendStatus({})
  }

  return (
    <WebSocketContext.Provider value={{ connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  )
}
