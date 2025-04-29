// src/contexts/WebSocketContext.ts
import { createContext } from "react"

interface WebSocketContextType {
  connect: (accessToken: string) => void
  disconnect: () => void
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null)
