'use client';

import { type ComponentProps, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  type ChatMessage,
  useSuspenseChatDmRoomId,
  useSuspenseChatHistory,
  useSuspenseUsersMe,
} from '~/api';
import { useChatSocket } from '~/socket';
import { ChatInputForm } from './chat-input-form';
import { ChatMessageList } from './chat-message-list';

interface Props extends ComponentProps<'div'> {
  currentFriendId: number;
}

export const ChatRoom = ({ className, currentFriendId, ...props }: Props) => {
  const { data: me } = useSuspenseUsersMe();
  const { data: room } = useSuspenseChatDmRoomId({ userId: me.data.id, friendId: currentFriendId });

  const roomId = room.data.roomId;
  const { data } = useSuspenseChatHistory({ roomId });

  const socket = useChatSocket();
  const [socketMessages, setSocketMessages] = useState<ChatMessage[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: roomId 변경 시 소켓 메시지 초기화
  useEffect(() => {
    setSocketMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;

    return socket.on('message', data => {
      if (!me?.data) return;

      const newMessage: ChatMessage = {
        id: data.messageId,
        nickname: data.nickname,
        time: new Date(data.timestamp).toLocaleTimeString(),
        message: data.contents,
      };

      setSocketMessages(prev => [...prev, newMessage]);
    });
  }, [socket.socket, socket.isConnected, me, socket.on]);

  const mergedMessages = useMemo(() => {
    const map = new Map<number, ChatMessage>();
    [...data.data.chatHistory, ...socketMessages].forEach(msg => {
      map.set(msg.id, msg);
    });
    return Array.from(map.values());
  }, [data.data.chatHistory, socketMessages]);

  const handleSend = (message: string) => {
    socket.emit('message', { roomId, contents: message });
  };

  return (
    <div
      className={twMerge('column-between h-full overflow-hidden bg-[#FD906F]', className)}
      {...props}
    >
      <ChatMessageList messages={mergedMessages} currentUserNickname={me.data.nickname} />
      <hr className="w-full shrink-0 border-neutral-950 border-t-2 border-dashed" />
      <ChatInputForm onSend={handleSend} />
    </div>
  );
};
