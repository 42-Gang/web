export interface ChatMessage {
  id: number;
  nickname: string;
  time: string;
  message: string;
}

export interface ChatHistoryPayload {
  roomId: number;
}

export interface ChatHistory {
  chatHistory: ChatMessage[];
}

export interface ChatDMRoomPayload {
  userId: number;
  friendId: number;
}

export interface ChatDMRoomResponse {
  roomId: number;
}

export interface ChatMessagePayload {
  roomId: number;
  contents: string;
}

export interface ChatMessageResponse {
  roomId: number;
  userId: number;
  messageId: number;
  nickname: string;
  contents: string;
  timestamp: string;
}
