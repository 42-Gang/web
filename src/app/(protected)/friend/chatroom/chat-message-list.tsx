'use client';

import { type ComponentProps, useLayoutEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ChatMessage } from '~/api';

interface Props extends ComponentProps<'ul'> {
  messages: ChatMessage[];
  currentUserNickname: string;
}

export const ChatMessageList = ({ className, messages, currentUserNickname, ...props }: Props) => {
  const listRef = useRef<HTMLUListElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: messages 변경 시 스크롤 이동
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  return (
    <ul
      ref={listRef}
      className={twMerge('column w-full flex-1 overflow-y-auto px-4 py-3', className)}
      {...props}
    >
      {messages.map(msg => {
        const isMe = msg.nickname === currentUserNickname;

        return (
          <li
            key={msg.id}
            className={twMerge('text-[#6F59B1] text-lg', isMe && 'text-end text-white')}
          >
            {!isMe && `${msg.nickname} : `}
            {msg.message}
          </li>
        );
      })}
    </ul>
  );
};
