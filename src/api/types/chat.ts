export type ChatMessage = {
  id: number;
  nickname: string;
  time: string;
  message: string;
};

export type ChatHistory = {
  chatHistory: ChatMessage[];
};
