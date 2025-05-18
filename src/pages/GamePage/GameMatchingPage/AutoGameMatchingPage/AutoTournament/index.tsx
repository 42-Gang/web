import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl ?? undefined;
  const playerNickname = data?.data?.nickname ?? '';

  // TODO: 상대방이 들어왔을 경우에 대한 처리
  const slots = [
    '/assets/images/sample1.png',
    playerAvatar,
    undefined,
    '/assets/images/sample2.png',
  ];

  const allMatched = slots.every((avatar) => avatar !== undefined);

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {slots.map((avatar, index) => {
          const isPlayer = avatar === playerAvatar;
          const isWaiting = avatar === undefined;

          return (
            <UserCard
              key={index}
              userAvatar={avatar ?? undefined}
              userNickname={isWaiting ? '-' : isPlayer ? playerNickname : `OPPONENT ${index + 1}`}
              isPlayer={isPlayer}
              isWaiting={isWaiting}
              mode="tournament"
              option="auto"
              isHostUser={false}
            />
          );
        })}
      </div>

      <WaitingMessage isWaiting={!allMatched} option="auto" isHost={false} />
    </Flex>
  );
};
