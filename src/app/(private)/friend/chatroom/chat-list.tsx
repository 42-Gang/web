'use client';

import {
  type ComponentProps,
  type FormEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import {
  type ChatMessage,
  useSuspenseChatDmRoomId,
  useSuspenseChatHistory,
  useSuspenseUsersMe,
} from '~/api';
import { useChatSocket } from '~/socket';

interface Props extends ComponentProps<'div'> {
  currentFriendId: number;
}

export const ChatList = ({ className, currentFriendId, ...props }: Props) => {
  const { data: me } = useSuspenseUsersMe();
  const { data: room } = useSuspenseChatDmRoomId({ userId: me.data.id, friendId: currentFriendId });

  const roomId = room.data.roomId;
  const { data } = useSuspenseChatHistory({ roomId });

  const socket = useChatSocket();

  const [message, setMessage] = useState<string>('');
  const [socketMessages, setSocketMessages] = useState<ChatMessage[]>([]);
  const messageListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setSocketMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (!socket.socket || !socket.isConnected) return;

    const msg = socket.on('message', data => {
      console.log('[global-socket] Chat message:', data);
      if (!me?.data) return;

      const newMessage: ChatMessage = {
        id: data.messageId,
        nickname: data.nickname,
        time: new Date(data.timestamp).toLocaleTimeString(),
        message: data.contents,
      };

      setSocketMessages(prev => [...prev, newMessage]);
    });

    return () => msg();
  }, [socket.socket, socket.isConnected, me, socket.on]);

  const mergedMessages = useMemo(() => {
    const map = new Map<number, ChatMessage>();
    [...data.data.chatHistory, ...socketMessages].forEach(msg => {
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
    <div className={twMerge('column-between h-full bg-[#FD906F]', className)} {...props}>
      <ul ref={messageListRef} className="w-full overflow-y-auto p-4">
        {mergedMessages.map(msg => {
          const isMe = msg.nickname === me.data.nickname;

          return (
            <li key={msg.id} className="flex text-white">
              {isMe ? 'ME' : msg.nickname}: {msg.message}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="" type="submit" aria-label="Send message" />
      </form>
    </div>
  );
};
