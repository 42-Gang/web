export type ChatMessage = {
  id: number;
  nickname: string;
  time: string;
  message: string;
};

export type ChatHistoryPayload = {
  roomId: number;
};

export type ChatHistory = {
  chatHistory: ChatMessage[];
};

export type ChatDMRoomPayload = {
  userId: number;
  friendId: number;
};

export type ChatDMRoomResponse = {
  roomId: number;
};

export type ChatMessagePayload = {
  roomId: number;
  contents: string;
};

export type ChatMessageResponse = {
  roomId: number;
  userId: number;
  messageId: number;
  nickname: string;
  contents: string;
  timestamp: string;
};
