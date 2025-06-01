import { useEffect, useState } from 'react';

import { useSuspenseChatDmRoomId, useSuspenseUsersMe } from '@/api';
import { useSocket } from '@/api/socket';

import * as styles from './styles.css';

type Props = {
  current: number;
};

export const ChatBox = ({ current }: Props) => {
  const { data: me } = useSuspenseUsersMe();
  const { data: room } = useSuspenseChatDmRoomId(me.data.id, current);

  const roomId: number = room.data.roomId;

  // const { data } = useChatHistory(roomId);

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

  const handleSend = () => {
    socket.emit('message', { roomId, contents: message });
  };

  return (
    <div className={styles.root}>
      <div className={styles.messageList}>
        {/*{messages.map((msg, idx) => {*/}
        {/*  const isMyMessage = msg.startsWith('ME:');*/}
        {/*  return (*/}
        {/*    <div key={idx} className={isMyMessage ? styles.myMessage : styles.otherMessage}>*/}
        {/*      {msg}*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
      </div>

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message.trim()) handleSend();
          }}
        />
        <button className={styles.sendButton} onClick={handleSend} />
      </div>
    </div>
  );
};
