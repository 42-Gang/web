import { clsx } from 'clsx';
import { FormEvent, useEffect, useState } from 'react';

import { useSuspenseChatDmRoomId, useSuspenseChatHistory, useSuspenseUsersMe } from '@/api';
import { useSocket } from '@/api/socket';

import * as styles from './styles.css';

type Props = {
  current: number;
};

export const ChatBox = ({ current }: Props) => {
  const { data: me } = useSuspenseUsersMe();
  const { data: room } = useSuspenseChatDmRoomId(me.data.id, current);

  const roomId: number = room.data.roomId;

  const { data } = useSuspenseChatHistory(roomId);

  const { socket, connect, disconnect } = useSocket({
    path: 'chat',
    handshake: '/ws/chat',
    withToken: true,
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const [message, setMessage] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('message', { roomId, contents: message });
    setMessage('');
  };

  return (
    <div className={styles.root}>
      <div className={styles.messageList}>
        {data.data.chatHistory.map((message) => {
          return (
            <div
              key={message.id}
              className={clsx(styles.message, message.nickname === me.data.nickname && styles.me)}
            >
              {message.nickname === me.data.nickname ? 'ME' : message.nickname}: {message.message}
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
        <button className={styles.sendButton} type="submit" />
      </form>
    </div>
  );
};
