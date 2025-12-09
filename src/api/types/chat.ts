export interface ChatMessage {
	id: number;
	nickname: string;
	time: string;
	message: string;
}

export interface ChatHistoryMessage {
	id: number;
	nickname: string;
	timestamp: string;
	message: string;
}

export interface ChatHistoryPayload {
	roomId: number;
	nextCursor?: number;
	limit?: number;
}

export interface ChatHistory {
	chatHistory: ChatHistoryMessage[];
	hasNext: boolean;
	nextCursor: number;
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
