'use client';

import {
  type ComponentProps,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import type { ChatMessage } from '~/api';

interface Props extends ComponentProps<'ul'> {
  messages: ChatMessage[];
  currentUserNickname: string;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export interface ChatMessageListRef {
  scrollToBottom: () => void;
}

export const ChatMessageList = forwardRef<ChatMessageListRef, Props>(
  ({ className, messages, currentUserNickname, onLoadMore, isLoadingMore, ...props }, ref) => {
    const listRef = useRef<HTMLUListElement | null>(null);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
    const previousScrollHeightRef = useRef<number>(0);
    const previousFirstMessageIdRef = useRef<number | null>(null);

    const scrollToBottom = () => {
      const list = listRef.current;
      if (list) {
        list.scrollTop = list.scrollHeight;
        setShouldScrollToBottom(true);
      }
    };

    useImperativeHandle(ref, () => ({
      scrollToBottom,
    }));

    // 스크롤 위치 감지 및 이전 메시지 로드
    useEffect(() => {
      const list = listRef.current;
      if (!list || !onLoadMore) return;

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = list;
        const isNearTop = scrollTop < 100;

        if (isNearTop && !isLoadingMore) {
          onLoadMore();
        }

        // 사용자가 하단 근처에 있으면 자동 스크롤 활성화
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShouldScrollToBottom(isNearBottom);
      };

      list.addEventListener('scroll', handleScroll);
      return () => list.removeEventListener('scroll', handleScroll);
    }, [onLoadMore, isLoadingMore]);

    // 메시지 변경 시 스크롤 처리
    useLayoutEffect(() => {
      const list = listRef.current;
      if (!list) return;

      const currentFirstMessageId = messages.length > 0 ? messages[0]?.id : null;
      const previousFirstMessageId = previousFirstMessageIdRef.current;

      // 첫 번째 메시지 ID가 변경되었으면 상단에 메시지가 추가된 것 (이전 메시지 로드)
      const messagesAddedAtTop =
        previousFirstMessageId !== null && currentFirstMessageId !== previousFirstMessageId;

      if (messagesAddedAtTop && !shouldScrollToBottom) {
        // 이전 메시지를 로드한 경우 스크롤 위치 유지
        const scrollHeightDiff = list.scrollHeight - previousScrollHeightRef.current;
        list.scrollTop += scrollHeightDiff;
      } else if (shouldScrollToBottom) {
        // 새 메시지가 추가된 경우 하단으로 스크롤
        list.scrollTop = list.scrollHeight;
      }

      previousScrollHeightRef.current = list.scrollHeight;
      previousFirstMessageIdRef.current = currentFirstMessageId;
    }, [messages, shouldScrollToBottom]);

    return (
      <ul
        ref={listRef}
        className={twMerge('column w-full flex-1 overflow-y-auto px-4 py-3', className)}
        style={{ overflowAnchor: 'none' }}
        {...props}
      >
        {isLoadingMore && (
          <li className="py-2 text-center text-neutral-600 text-sm">이전 메시지 불러오는 중...</li>
        )}
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
  },
);

ChatMessageList.displayName = 'ChatMessageList';
