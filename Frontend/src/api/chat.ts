import axios from "axios";

interface ChatHistoryItem {
  id: number;
  nickname: string;
  message: string;
  time: string;
  userId: number;
}
export const fetchChatHistory = async (roomId: string) => {
  try {
    const response = await axios.get(`/v1/chat/${roomId}/messages`);

    const chatHistory: ChatHistoryItem[] =
      response?.data?.data?.chatHistory || [];

    return chatHistory.map((item, idx) => ({
      id: idx + 1,
      senderId: item.userId.toString(),
      nickname: item.nickname,
      message: item.message,
      time: item.time,
    }));
  } catch (error) {
    console.error("❌ 채팅 기록 불러오기 실패:", error);
    return [];
  }
};
