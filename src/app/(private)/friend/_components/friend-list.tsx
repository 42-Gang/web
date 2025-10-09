'use client';

import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useSuspenseFriendsMe } from '~/api';
import { MailIcon } from '~/components/icon';
import { FriendItem } from '~/components/ui';
import { routes } from '~/constants/routes';

export const FriendList = () => {
  const { data } = useSuspenseFriendsMe();
  const [filter] = useQueryState('filter', {
    defaultValue: '',
    shallow: false,
  });

  const filteredFriends = data.data.friends.filter(friend => 
    friend.nickname.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className="column mt-6 w-full flex-1 border-neutral-50 border-t">
      {filteredFriends.map(friend => (
        <li
          key={friend.friendId}
          className="row-between w-full border-b border-b-neutral-50 px-4 py-3 text-white"
        >
          <FriendItem friend={friend} />
          <Link
            className="text-white active:translate-y-px"
            href={`/${routes.friend_chatroom}?friendId=${friend.friendId}`}
          >
            <MailIcon size={24} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
