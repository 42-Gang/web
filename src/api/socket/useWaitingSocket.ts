import { useEffect } from 'react';
import { toast } from 'sonner';

import type {
  WaitingRoomUpdatePayload,
  TournamentCreatedPayload,
  CustomInvitedPayload,
} from '@/api/types';

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

    const handleWaitingRoomUpdate = (data: WaitingRoomUpdatePayload) => {
      toast.success(`대기실 업데이트: ${data.users.length}명 참여 중`);
    };

    const handleTournamentCreated = (data: TournamentCreatedPayload) => {
      toast.success(`토너먼트가 시작되었습니다. (ID: ${data.tournamentId}, 모드: ${data.mode})`);
    };

    const handleTournamentInvited = (data: CustomInvitedPayload) => {
      const nickname = data.hostId ?? `ID ${data.hostId}`;
      toast.info(`${nickname}님이 초대했습니다. 수락하시겠습니까?`, {
        action: {
          label: 'Yes',
          onClick: () => {
            if (socket) {
              socket.emit('custom-accept', { roomId: data.roomId });
            }
          },
        },
        cancel: {
          label: 'No',
          onClick: () => {},
        },
      });
    };

    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    socket.on('tournament-created', handleTournamentCreated);
    socket.on('custom-invite', handleTournamentInvited);

    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
      socket.off('custom-invite', handleTournamentInvited);
    };
  }, [socket]);
};
