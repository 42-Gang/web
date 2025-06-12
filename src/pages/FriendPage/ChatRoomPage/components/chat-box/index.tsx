import { clsx } from 'clsx';
import { FormEvent, useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';

import {
  ChatMessage,
  ChatMessageResponse,
  useSuspenseChatDmRoomId,
  useSuspenseChatHistory,
  useSuspenseUsersMe,
} from '@/api';
import { useSocket } from '@/api/socket';

import * as styles from './styles.css';

type Props = {
  current: number;
};

export const ChatBox = ({ current }: Props) => {
  const { data: me } = useSuspenseUsersMe();
  const { data: room } = useSuspenseChatDmRoomId(me.data.id, current);
  const roomId = room.data.roomId;

  const { data } = useSuspenseChatHistory(roomId);
  const { socket } = useSocket({
    path: 'chat',
    handshake: '/ws/Chat',
    withToken: true,
  });

  const [message, setMessage] = useState('');
  const [socketMessages, setSocketMessages] = useState<ChatMessage[]>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSocketMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (data: ChatMessageResponse) => {
      if (!me) return;

      const newMessage: ChatMessage = {
        id: data.messageId,
        nickname: data.nickname,
        time: new Date(data.timestamp).toLocaleTimeString(),
        message: data.contents,
      };

      setSocketMessages((prev) => [...prev, newMessage]);
    };

    socket.on('message', handleChatMessage);
    return () => {
      socket.off('message', handleChatMessage);
    };
  }, [socket, me]);

  const mergedMessages = useMemo(() => {
    const map = new Map<number, ChatMessage>();
    [...data.data.chatHistory, ...socketMessages].forEach((msg) => {
      map.set(msg.id, msg);
    });
    return Array.from(map.values());
  }, [data.data.chatHistory, socketMessages]);

  useLayoutEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [mergedMessages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('message', { roomId, contents: message });
    setMessage('');
  };

  return (
    <div className={styles.root}>
      <div ref={messageListRef} className={styles.messageList}>
        {mergedMessages.map((msg) => {
          const isMe = msg.nickname === me.data.nickname;
          return (
            <div key={msg.id} className={clsx(styles.message, isMe && styles.me)}>
              {isMe ? 'ME' : msg.nickname}: {msg.message}
            </div>
          );
        })}
      </div>
      <form className={styles.inputWrapper} onSubmit={handleSend}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.sendButton} type="submit" aria-label="Send message" />
      </form>
    </div>
  );
};
