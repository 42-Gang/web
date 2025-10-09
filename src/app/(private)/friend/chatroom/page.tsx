import { Suspense } from '@suspensive/react';
import { ChatList } from '~/app/(private)/friend/chatroom/chat-list';
import { CloseButton } from '~/components/ui';
import { FriendList } from './friend-list';

interface Props {
  searchParams: Promise<{ friendId: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { friendId: _friendId } = await searchParams;

  const friendId = !Number.isNaN(Number(_friendId)) ? Number(_friendId) : null;

  return (
    <>
      <CloseButton />
      <div className="flex h-full">
        <Suspense clientOnly>
          <FriendList className="column mt-16 w-1/4" currentFriendId={friendId} />
        </Suspense>

        <Suspense clientOnly>
          <div className="column w-3/4">{friendId && <ChatList currentFriendId={friendId} />}</div>
        </Suspense>
      </div>
    </>
  );
};

export default Page;
