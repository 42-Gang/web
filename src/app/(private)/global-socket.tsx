'use client';

import { useChatSocket, useFriendSocket, useGameInviteSocket } from '~/socket';

export const GlobalSocket = () => {
  useFriendSocket();
  useGameInviteSocket();
  useChatSocket();

  return null;
};
