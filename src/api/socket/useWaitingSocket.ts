import { useEffect } from 'react';
import { toast } from 'sonner';

import type { CustomInviteResponse } from '@/api/types';

import { useSocket } from './useSocket';

export const useWaitingSocket = () => {
  const { socket, connect, disconnect } = useSocket({
    path: 'waiting',
    handshake: '/ws/main-game',
    withToken: true,
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (!socket) return;

    const handleTournamentInvited = (data: CustomInviteResponse) => {
      if (!socket) return;

      const nickname = data.hostId ?? `ID ${data.hostId}`;
      toast.info(`${nickname}님이 초대했습니다. 수락하시겠습니까?`, {
        action: {
          label: 'Yes',
          onClick: () => socket.emit('custom-accept', { roomId: data.roomId }),
        },
        cancel: {
          label: 'No',
          onClick: () => undefined,
        },
      });
    };

    socket.on('custom-invite', handleTournamentInvited);

    return () => {
      socket.off('custom-invite', handleTournamentInvited);
    };
  }, [socket]);

  return { socket };
};
