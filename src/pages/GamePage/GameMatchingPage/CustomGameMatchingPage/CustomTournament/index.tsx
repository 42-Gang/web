import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

const TEST_SCENARIO = {
  playerIndex: 1, // 현재 유저의 슬롯 번호 (0~3)
  hostIndex: 3, // 방장의 슬롯 번호
  opponentStates: [
    true, // 0번 슬롯: 상대 있음 (방장임)
    true, // 1번 슬롯: 나
    true, // 2번 슬롯: 대기중
    true, // 3번 슬롯: 상대 있음
  ],
};

export const GameTournamentMatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname;

  const slots = TEST_SCENARIO.opponentStates.map((exists, i) => {
    if (i === TEST_SCENARIO.playerIndex) return playerAvatar;
    return exists ? `/assets/images/sample${i + 1}.png` : null;
  });

  const allMatched = slots.every((avatar) => avatar !== null);
  const isHostUser = TEST_SCENARIO.playerIndex === TEST_SCENARIO.hostIndex;

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
              userAvatar={avatar ?? null}
              userNickname={
                isWaiting ? '-' : isPlayer ? (playerNickname ?? '') : `OPPONENT ${index + 1}`
              }
              isPlayer={isPlayer}
              isCurrentUser={isPlayer}
              position={index % 2 === 0 ? 'left' : 'right'}
              isWaiting={isWaiting}
              mode="tournament"
              option="custom"
              isPlayerHost={isPlayerHost}
              isHostUser={isHostUser}
              onClickAdd={
                !isPlayer && isWaiting && isHostUser ? () => console.error('Invite') : undefined
              }
            />
          );
        })}
      </div>

      <WaitingMessage isWaiting={!allMatched} option="custom" isHost={isHostUser} />
    </Flex>
  );
};
