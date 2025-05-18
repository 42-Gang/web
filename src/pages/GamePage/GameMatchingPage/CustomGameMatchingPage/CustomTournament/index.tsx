import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

const TEST_SCENARIO = {
  playerIndex: 2, // 현재 유저의 슬롯 번호 (0~3)
  hostIndex: 2, // 방장의 슬롯 번호
  opponentStates: [
    true, // 0번 슬롯: 상대 있음 (방장임)
    false, // 1번 슬롯: 나
    true, // 2번 슬롯: 대기중
    true, // 3번 슬롯: 상대 있음
  ],
};

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl ?? null;
  const playerNickname = data?.data?.nickname ?? '';

  const isHostUser = TEST_SCENARIO.playerIndex === TEST_SCENARIO.hostIndex;

  const slots = TEST_SCENARIO.opponentStates.map((exists, index) => {
    if (index === TEST_SCENARIO.playerIndex) return playerAvatar;
    return exists ? `/assets/images/sample${index + 1}.png` : null;
  });

  const allMatched = slots.every((avatar) => avatar !== null);

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>CUSTOM TOURNAMENT</h2>

      <div className={styles.matchArea}>
        {slots.map((avatar, index) => {
          const isPlayer = index === TEST_SCENARIO.playerIndex;
          const isWaiting = avatar === null;
          const isPlayerHost = index === TEST_SCENARIO.hostIndex;

          return (
            <UserCard
              key={index}
              userAvatar={avatar}
              userNickname={isWaiting ? '-' : isPlayer ? playerNickname : `OPPONENT ${index + 1}`}
              isPlayer={isPlayer}
              isWaiting={isWaiting}
              position={index % 2 === 0 ? 'left' : 'right'}
              mode="tournament"
              option="custom"
              isHostUser={isHostUser}
              isPlayerHost={isPlayerHost}
              onClickAdd={
                !isPlayer && isWaiting && isHostUser
                  ? () => console.error(`Invite slot ${index}`)
                  : undefined
              }
            />
          );
        })}
      </div>

      <WaitingMessage isWaiting={!allMatched} option="custom" isHost={isHostUser} />
    </Flex>
  );
};
