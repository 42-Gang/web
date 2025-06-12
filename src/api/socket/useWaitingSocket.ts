import { useEffect } from 'react';
import { toast } from 'sonner';

import type {
  WaitingRoomUpdatePayload,
  TournamentCreatedPayload,
  CustomInvitedPayload,
} from '@/api/types';

import { useSocket } from './useSocket';
import { useWaitingStore } from '../store/useWaitingStateStore';

export const useWaitingSocket = () => {
  const { setUsers, setInvitation, setHostId } = useWaitingStore();

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
      setUsers(data.users);
    };

    const handleTournamentCreated = (data: TournamentCreatedPayload) => {
      toast.success(`토너먼트가 시작되었습니다. (ID: ${data.tournamentId}, 모드: ${data.mode})`);
      // Todo: 페이지 이동 추가

      useWaitingStore.getState().clearRoom();
      useWaitingStore.getState().clearInvitation();
    };

    const handleTournamentInvited = (data: CustomInvitedPayload) => {
      setInvitation(data);
      setHostId(data.hostId);

      const host = useWaitingStore.getState().users.find((u) => u.id === data.hostId);
      const nickname = host?.nickname ?? `ID ${data.hostId}`;
      toast.info(`${nickname}님이 초대했습니다. 수락하시겠습니까?`, {
        action: {
          label: 'Yes',
          onClick: () => {
            if (socket) {
              socket.emit('custom-accept', { roomId: data.roomId });
              // TODO: 페이지 이동 추가
            }
          },
        },
        cancel: {
          label: 'No',
          onClick: () => {
            useWaitingStore.getState().clearInvitation();
          },
        },
      });
    };

    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    socket.on('tournament-created', handleTournamentCreated);
    socket.on('custom-invited', handleTournamentInvited);

    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
      socket.off('custom-invited', handleTournamentInvited);
    };
  }, [socket, setUsers, setInvitation, setHostId]);
};
