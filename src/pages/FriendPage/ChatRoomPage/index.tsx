import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

import { type Friend, useFriendsMe } from '@/api';
import { BackButton } from '@/components/ui';
import { PATH } from '@/constants';

import { ChatBox } from './components/chat-box';
import { FriendHeader } from './components/chat-friend-header';
import { FriendList } from './components/chat-friend-list';
import * as styles from './styles.css';

export const ChatRoomPage = () => {
  const { data, isLoading } = useFriendsMe();
  const friends: Friend[] = data?.data?.friends ?? [];

  const [params] = useSearchParams();
  const current: number = Number(params.get('friend'));

  if (isLoading || !current || isNaN(current)) {
    return <div className={styles.chat}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <BackButton href={PATH.FRIEND} />
        <FriendList current={current} friends={friends} />
      </div>

      <div className={styles.chat}>
        <FriendHeader current={current} />
        <Suspense fallback={<>Loading chat...</>}>
          <ChatBox current={current} />
        </Suspense>
      </div>
    </div>
  );
};
