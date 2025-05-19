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
  const playerNickname = data?.data?.nickname ?? '';

  const opponentAvatar: string | undefined = TEST_SCENARIO.opponentExists
    ? '/assets/images/sample-avatar.png'
    : undefined;

  const isOpponentWaiting = !opponentAvatar;
  const isPlayerHost = TEST_SCENARIO.iAmHost;
  const opponentIsHost = !isPlayerHost;

  const handleInviteFriend = () => {
    console.error('Invite friend clicked');
  };

  const playerProps = {
    userAvatar: playerAvatar,
    userNickname: playerNickname,
    isPlayer: true,
    isWaiting: false,
    mode: '1vs1' as const,
    option: 'custom' as const,
    isHostUser: isPlayerHost,
  };

  const opponentProps = {
    userAvatar: opponentAvatar,
    userNickname: 'OPPONENT',
    isPlayer: false,
    isWaiting: isOpponentWaiting,
    mode: '1vs1' as const,
    option: 'custom' as const,
    isHostUser: isPlayerHost,
    isPlayerHost: opponentIsHost,
    onClickAdd: handleInviteFriend,
  };

  const [leftCard, rightCard] = isPlayerHost
    ? [
        <UserCard key="player" {...playerProps} position="left" />,
        <UserCard key="opponent" {...opponentProps} position="right" />,
      ]
    : [
        <UserCard key="opponent" {...opponentProps} position="left" />,
        <UserCard key="player" {...playerProps} position="right" />,
      ];

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
