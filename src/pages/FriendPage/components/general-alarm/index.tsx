import { useState } from 'react';

import { Flex } from '@/components/system/index.ts';

import * as styles from './styles.css.ts';

type User = {
  id: number;
  nickname: string;
  avatarUrl: string;
};

const mockUsers: User[] = [
  { id: 1, nickname: 'PANG', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 2, nickname: 'PENG', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 3, nickname: 'PING', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 4, nickname: 'PONG', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 5, nickname: 'DING', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 6, nickname: 'DONG', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 7, nickname: 'LUNA', avatarUrl: '/assets/images/sample-avatar.png' },
  { id: 8, nickname: 'SOLAR', avatarUrl: '/assets/images/sample-avatar.png' },
];

export const GeneralAlarm = () => {
  const [alarmUsers, setAlarmUsers] = useState<User[]>(mockUsers);

  const removeAlarm = (id: number) => {
    setAlarmUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <Flex direction="column" alignItems="center">
      <h2 className={styles.title}>Invites & Requests</h2>
      <div className={styles.requestList}>
        {alarmUsers.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <img src={user.avatarUrl} alt="avatar" className={styles.avatar} />
                <span className={styles.nickname}>{user.nickname}</span>
              </Flex>
              <div className={styles.button}>
                <button
                  className={styles.rejection}
                  onClick={() => removeAlarm(user.id)}
                  aria-label="Reject"
                />
                <button
                  className={styles.approval}
                  onClick={() => removeAlarm(user.id)}
                  aria-label="Approve"
                />
              </div>
            </Flex>
          </div>
        ))}
      </div>
    </Flex>
  );
};
