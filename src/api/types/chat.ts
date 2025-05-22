export type ChatMessage = {
  id: number;
  nickname: string;
  time: string;
  message: string;
};

export type MessageFromServer = {
  roomId: number;
  userId: number;
  nickname: string;
  contents: string;
  timestamp: string;
};

export type ChatHistory = {
  chatHistory: ChatMessage[];
};

export type ChatDmRoomInfo = {
  roomId: number;
};
