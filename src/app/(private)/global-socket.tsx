'use client';

import { useEffect } from 'react';
import { useFriendSocket, useGameInviteSocket } from '~/socket';

export const GlobalSocket = () => {
  const { isConnected: isFriendConnected, on: onFriend } = useFriendSocket();
  const { isConnected: isGameInviteConnected, on: onGameInvite } = useGameInviteSocket();

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
    const customInvite = onGameInvite('custom-invite', data => {
      console.log('[GlobalSocket] Custom invite received:', data);
    });

    return () => {
      customInvite();
    };
  }, [onGameInvite]);

  useEffect(() => {
    if (isFriendConnected) {
      console.log('[GlobalSocket] Friend socket connected');
    }
  }, [isFriendConnected]);

  useEffect(() => {
    if (isGameInviteConnected) {
      console.log('[GlobalSocket] Game invite socket connected');
    }
  }, [isGameInviteConnected]);

  return null;
};
