import { useEffect } from 'react';
import { toast } from 'sonner';

import { socketPubSub } from '@/api/socket/socketPubSub';

export const useSocketNotification = () => {
  useEffect(() => {
    const handleFriendRequest = (data: {
      fromUserId: number;
      fromUserNickname: string;
      toUserId: number;
      timestamp: string;
    }) => {
      toast.info(`${data.fromUserNickname} sent you a friend request!`);
    };

    const handleFriendAccept = (data: {
      fromUserId: number;
      toUserNickname: string;
      toUserId: number;
      timestamp: string;
    }) => {
      toast.success(`${data.toUserNickname} accepted your friend request!`);
    };

    socketPubSub.subscribe('friend-request', handleFriendRequest);
    socketPubSub.subscribe('friend-accept', handleFriendAccept);

    return () => {
      socketPubSub.unsubscribe('friend-request', handleFriendRequest);
      socketPubSub.unsubscribe('friend-accept', handleFriendAccept);
    };
  }, []);
};
