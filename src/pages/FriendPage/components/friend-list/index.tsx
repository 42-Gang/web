import * as styles from './styles.css';

const FRIENDS = ['PING', 'JACK', 'DING', 'PONG'];

export const FriendList = () => {
  return (
    <div className={styles.friendList}>
      <ul className={styles.list}>
        <li className={styles.divider} />
        {FRIENDS.map((friend) => (
          <li key={friend} className={styles.item}>
            <img src="/assets/images/sample-avatar.png" className={styles.avatar} />
            <span>{friend}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
