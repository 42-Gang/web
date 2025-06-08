import { useEffect } from 'react';
import { toast } from 'sonner';

import type {
  ServerToClientEvents,
  ClientToServerEvents
} from '@/api/socket/socketEvents';
import type {
  WaitingRoomUpdatePayload,
  TournamentCreatedPayload,
  CustomInvitedPayload
} from '@/api/types';

import { useSocket } from './useSocket';
import { useWaitingStore } from '../store/useWaitingStore';

export const useWaitingSocket = () => {
  const { setUsers } = useWaitingStore();
  const { setInvitation, users } = useWaitingStore();

  const { socket, connect, disconnect } = useSocket({
  path: 'waiting',
  handshake: '/ws/waiting',
  withToken: true,
}) as {
  socket: import('socket.io-client').Socket<ServerToClientEvents, ClientToServerEvents>;
  connect: () => void;
  disconnect: () => void;
};

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
    };

    const handleTournamentInvited = (data: CustomInvitedPayload) => {
      setInvitation(data);

      const host = users.find((u) => u.id === data.hostId);
      const nickname = host?.nickname ?? `ID ${data.hostId}`;
      toast.info(`${nickname}님이 초대했습니다. 수락하시겠습니까?`);
    };

    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    socket.on('tournament-created', handleTournamentCreated);
    socket.on('custom-invited', handleTournamentInvited);

    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
      socket.off('custom-invited', handleTournamentInvited);
    }
  }, [socket, setUsers, setInvitation, users]);

  return { socket };
};