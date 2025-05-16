import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

// 테스트 시나리오
const TEST_SCENARIO = {
  opponentExists: false,
  iAmHost: true,
};

export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname;

  const opponentAvatar: string | null = TEST_SCENARIO.opponentExists
    ? '/assets/images/sample-avatar.png'
    : null;

  const isOpponentWaiting = !opponentAvatar;
  const isPlayerHost = TEST_SCENARIO.iAmHost;

  const handleInviteFriend = () => {
    console.error('Invite friend clicked');
  };

  const leftCard = isPlayerHost ? (
    <UserCard
      userAvatar={playerAvatar ?? null}
      userNickname={playerNickname ?? ''}
      position="left"
      isWaiting={false}
      mode="1vs1"
      option="custom"
      isPlayer={true}
      isCurrentUser={true}
      isPlayerHost={true} // 내가 방장
      isHostUser={true} // 내가 방장
    />
  ) : (
    <UserCard
      userAvatar={opponentAvatar}
      userNickname="OPPONENT"
      position="left"
      isWaiting={isOpponentWaiting}
      mode="1vs1"
      option="custom"
      isPlayer={false}
      isCurrentUser={false}
      isPlayerHost={true} // 상대가 방장
      isHostUser={false} // 나는 방장 아님
      onClickAdd={handleInviteFriend}
    />
  );

  const rightCard = isPlayerHost ? (
    <UserCard
      userAvatar={opponentAvatar}
      userNickname="OPPONENT"
      position="right"
      isWaiting={isOpponentWaiting}
      mode="1vs1"
      option="custom"
      isPlayer={false}
      isCurrentUser={false}
      isPlayerHost={false}
      isHostUser={true} // 나는 방장
      onClickAdd={handleInviteFriend}
    />
  ) : (
    <UserCard
      userAvatar={playerAvatar ?? null}
      userNickname={playerNickname ?? ''}
      position="right"
      isWaiting={false}
      mode="1vs1"
      option="custom"
      isPlayer={true}
      isCurrentUser={true}
      isPlayerHost={false}
      isHostUser={false}
    />
  );

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>CUSTOM SOLO</h2>

      <div className={styles.matchArea}>
        {leftCard}
        <span className={styles.vs}>VS</span>
        {rightCard}
      </div>

      <WaitingMessage isWaiting={isOpponentWaiting} option="custom" isHost={isPlayerHost} />
    </Flex>
  );
};
