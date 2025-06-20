import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { CustomInviteResponse } from '@/api';
import { PATH } from '@/constants';

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const handleTournamentInvited = (data: CustomInviteResponse) => {
      toast.info(`${data.hostName}님이 초대했습니다. 수락하시겠습니까?`, {
        action: {
          label: 'Yes',
          onClick: () => {
            if (data.tournamentSize && data.tournamentSize > 2) {
              navigate(
                `${PATH.GAME_CUSTOM_MATCHING}?mode=tournament&size=${data.tournamentSize}&roomId=${data.roomId}`,
                { replace: true },
              );
            } else {
              navigate(`${PATH.GAME_CUSTOM_MATCHING}?mode=1vs1&roomId=${data.roomId}`, {
                replace: true,
              });
            }
          },
        },
        cancel: {
          label: 'No',
          onClick: () => undefined,
        },
        duration: 10000,
      });
    };

    socket.on('custom-invite', handleTournamentInvited);

    return () => {
      socket.off('custom-invite', handleTournamentInvited);
    };
  }, [socket, navigate]);

  return { socket };
};
