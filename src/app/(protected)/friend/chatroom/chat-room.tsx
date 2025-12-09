'use client';

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { type ComponentProps, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { type ChatHistory, type ChatMessage, type HttpResponse, queryKeys } from '~/api';
import { fetcher } from '~/api/base';
import { useChatSocket } from '~/socket';
import { ChatInputForm } from './chat-input-form';
import { type ChatMessageListRef, ChatMessageList } from './chat-message-list';

interface Props extends ComponentProps<'div'> {
  currentFriendId: number;
}

export const ChatRoom = ({ className, currentFriendId, ...props }: Props) => {
  const { data: me } = useSuspenseQuery(queryKeys.users.me);
  const { data: room } = useSuspenseQuery(
    queryKeys.chats.dmRoomId({ userId: me.data.id, friendId: currentFriendId }),
  );

  const roomId = room.data.roomId;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['chats', 'history', { roomId, limit: 50 }],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      const searchParams = new URLSearchParams();
      if (pageParam !== undefined) {
        searchParams.append('nextCursor', String(pageParam));
      }
      searchParams.append('limit', '30');
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

    // API에서 받은 메시지들을 ChatMessage 형식으로 변환
    // pages는 첫 번째가 최신, 나중 페이지가 더 오래된 메시지
    // 역순으로 합쳐서 오래된 메시지가 앞에 오도록 함
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
    // 메시지 전송 후 스크롤을 하단으로 이동
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
