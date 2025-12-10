'use client';

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { type ComponentProps, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { type ChatHistory, type ChatMessage, type HttpResponse, queryKeys } from '~/api';
import { fetcher } from '~/api/base';
import { useChatSocket } from '~/socket';
import { ChatInputForm } from './chat-input-form';
import { ChatMessageList, type ChatMessageListRef } from './chat-message-list';

interface Props extends ComponentProps<'div'> {
  currentFriendId: number;
}

export const ChatRoom = ({ className, currentFriendId, ...props }: Props) => {
  const { data: me } = useSuspenseQuery(queryKeys.users.me);
  const { data: room } = useSuspenseQuery(
    queryKeys.chats.dmRoomId({ userId: me.data.id, friendId: currentFriendId }),
  );

  const LIMIT = 50;
  const roomId = room.data.roomId;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['chats', 'history', { roomId, limit: LIMIT }],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      const searchParams = new URLSearchParams();
      if (pageParam !== undefined) {
        searchParams.append('nextCursor', String(pageParam));
      }
      searchParams.append('limit', String(LIMIT));
      return fetcher.get<HttpResponse<ChatHistory>>(`v1/chat/${roomId}/messages`, {
        searchParams,
      });
    },
    getNextPageParam: lastPage => {
      if (lastPage.data.hasNext) {
        return lastPage.data.nextCursor;
      }
      return undefined;
    },
    initialPageParam: undefined as number | undefined,
    staleTime: 0,
    gcTime: 0,
  });

  const socket = useChatSocket();
  const [socketMessages, setSocketMessages] = useState<ChatMessage[]>([]);
  const messageListRef = useRef<ChatMessageListRef>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: roomId 변경 시 소켓 메시지 초기화
  useEffect(() => {
    setSocketMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (!socket.socket) return;

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
  }, [socket.socket, me, socket.on]);

  const mergedMessages = useMemo(() => {
    const map = new Map<number, ChatMessage>();

    const apiMessages: ChatMessage[] =
      data?.pages
        .slice()
        .reverse()
        .flatMap(page =>
          page.data.chatHistory.map(msg => ({
            id: msg.id,
            nickname: msg.nickname,
            time: new Date(msg.timestamp).toLocaleTimeString(),
            message: msg.message,
          })),
        ) ?? [];

    [...apiMessages, ...socketMessages].forEach(msg => {
      map.set(msg.id, msg);
    });
    return Array.from(map.values());
  }, [data?.pages, socketMessages]);

  const handleSend = (message: string) => {
    socket.emit('message', { roomId, contents: message });
    setTimeout(() => {
      messageListRef.current?.scrollToBottom();
    }, 0);
  };

  return (
    <div
      className={twMerge('column-between h-full overflow-hidden bg-[#FD906F]', className)}
      {...props}
    >
      <ChatMessageList
        ref={messageListRef}
        messages={mergedMessages}
        currentUserNickname={me.data.nickname}
        onLoadMore={hasNextPage ? fetchNextPage : undefined}
        isLoadingMore={isFetchingNextPage}
      />
      <hr className="w-full shrink-0 border-neutral-950 border-t-2 border-dashed" />
      <ChatInputForm onSend={handleSend} />
    </div>
  );
};
