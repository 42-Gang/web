import { Suspense } from '@suspensive/react';
import { ChatHeader } from '~/app/(protected)/friend/chatroom/chat-header';
import { CloseButton } from '~/components/ui';
import { ChatRoom } from './chat-room';
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
          <FriendList className="column mt-14 w-1/4" currentFriendId={friendId} />
        </Suspense>

        {friendId && (
          <Suspense clientOnly>
            <div className="column w-3/4 overflow-hidden">
              <ChatHeader currentFriendId={friendId} />
              <ChatRoom currentFriendId={friendId} />
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Page;
