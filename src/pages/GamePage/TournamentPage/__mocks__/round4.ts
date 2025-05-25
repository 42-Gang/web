import type { Match } from '@/api/types/game';

export const roundFourData: Match = {
  id: 'round4-root',
  children: [
    {
      id: 'semi1',
      player1: {
        id: 'pong',
        name: 'PONG',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 10,
        lose: 3,
        tournament: 1,
      },
      player2: {
        id: 'ping',
        name: 'PING',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 5,
        lose: 5,
        tournament: 0,
      },
      winnerId: 'pong',
    },
    {
      id: 'semi2',
      player1: {
        id: 'ding',
        name: 'Ding',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 7,
        lose: 5,
        tournament: 2,
      },
      player2: {
        id: 'dong',
        name: 'Dong',
        avatarUrl: '/assets/images/sample-avatar.png',
        win: 4,
        lose: 6,
        tournament: 0,
      },
      winnerId: 'ding',
    },
  ],
};
