import { useState } from 'react';

import { useUsersMe } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui';

import * as styles from './styles.css';
import { UserCard } from '../../components/user-card';
import { WaitingMessage } from '../../components/waiting-message';

export const Game1vs1MatchingPage = () => {
  const { data } = useUsersMe();
  const playerAvatar = data?.data?.avatarUrl;
  const playerNickname = data?.data?.nickname;

  // 상대방이 아직 안 들어온 상황
  const opponentAvatar = null;
  const isOpponentWaiting = !opponentAvatar;

  // 입장 순서만 판단 (왼쪽인지 오른쪽인지 결정)
  const [isPlayerFirst] = useState(() => {
    return opponentAvatar; // 상대 없으면 내가 먼저 입장한 것
  });

  const playerCard = (
    <UserCard
      userAvatar={playerAvatar ?? null}
      userNickname={playerNickname ?? ''}
      position={isPlayerFirst ? 'left' : 'right'}
      isWaiting={false}
      mode="1vs1"
      option="auto"
      isPlayer={true}
      isCurrentUser={true}
      isPlayerHost={false}
      isHostUser={false}
    />
  );

  const opponentCard = (
    <UserCard
      userAvatar={opponentAvatar}
      userNickname="OPPONENT"
      position={isPlayerFirst ? 'right' : 'left'}
      isWaiting={isOpponentWaiting}
      mode="1vs1"
      option="auto"
      isPlayer={false}
      isCurrentUser={false}
      isPlayerHost={false}
      isHostUser={false}
    />
  );

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <BackButton />
      <h2 className={styles.title}>AUTO SOLO</h2>

      <div className={styles.matchArea}>
        {isPlayerFirst ? (
          <>
            {playerCard}
            <span className={styles.vs}>VS</span>
            {opponentCard}
          </>
        ) : (
          <>
            {opponentCard}
            <span className={styles.vs}>VS</span>
            {playerCard}
          </>
        )}
      </div>

      <WaitingMessage isWaiting={isOpponentWaiting} option="auto" isHost={false} />
    </Flex>
  );
};
