import { useState } from 'react';

import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl ?? null;
  const playerNickname = data?.data?.nickname ?? '';

  const opponentAvatar: string | null = null;
  const isOpponentWaiting = !opponentAvatar;
  const [isPlayerFirst] = useState(() => !opponentAvatar);

  const playerProps = {
    userAvatar: playerAvatar,
    userNickname: playerNickname,
    isPlayer: true,
    isWaiting: false,
    mode: '1vs1' as const,
    option: 'auto' as const,
    isHostUser: false,
  };

  const opponentProps = {
    userAvatar: opponentAvatar,
    userNickname: 'OPPONENT',
    isPlayer: false,
    isWaiting: isOpponentWaiting,
    mode: '1vs1' as const,
    option: 'auto' as const,
    isHostUser: false,
  };

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO SOLO</h2>

      <div className={styles.matchArea}>
        {isPlayerFirst ? (
          <>
            <UserCard key="player" {...playerProps} position="left" />
            <span className={styles.vs}>VS</span>
            <UserCard key="opponent" {...opponentProps} position="right" />
          </>
        ) : (
          <>
            <UserCard key="opponent" {...opponentProps} position="left" />
            <span className={styles.vs}>VS</span>
            <UserCard key="player" {...playerProps} position="right" />
          </>
        )}
      </div>

      <WaitingMessage isWaiting={isOpponentWaiting} option="auto" isHost={false} />
    </Flex>
  );
};
