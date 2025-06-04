import { useEffect } from 'react';
import { toast } from 'sonner';

import type {
  ServerToClientEvents,
  ClientToServerEvents
} from '@/api/socket/socketEvents';
import type {
  WaitingRoomUpdatePayload,
  TournamentCreatedPayload
} from '@/api/types';

import { useSocket } from './useSocket';
import { useWaitingStore } from '../store/useWaitingStore';

export const useWaitingSocket = () => {
  const { setUsers } = useWaitingStore();

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
      // 필요 시 페이지 이동 처리 등 추가
    };

    socket.on('waiting-room-update', handleWaitingRoomUpdate);
    socket.on('tournament-created', handleTournamentCreated);

    return () => {
      socket.off('waiting-room-update', handleWaitingRoomUpdate);
      socket.off('tournament-created', handleTournamentCreated);
    }
  }, [socket, setUsers]);

  return { socket };
};