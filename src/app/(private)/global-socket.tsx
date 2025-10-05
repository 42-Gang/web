'use client';

import { useEffect } from 'react';
import { useFriendSocket } from '~/socket';

export const GlobalSocket = () => {
  const { isConnected: isFriendConnected, on: onFriend } = useFriendSocket();

  useEffect(() => {
    const friendRequest = onFriend('friend-request', data => {
      console.log('[GlobalSocket] Friend request received:', data);
    });

    const friendAccept = onFriend('friend-accept', data => {
      console.log('[GlobalSocket] Friend accept received:', data);
    });

    return () => {
      friendRequest();
      friendAccept();
    };
  }, [onFriend]);

  useEffect(() => {
    if (isFriendConnected) {
      console.log('[GlobalSocket] Friend socket connected');
    }
  }, [isFriendConnected]);

  return null;
};
