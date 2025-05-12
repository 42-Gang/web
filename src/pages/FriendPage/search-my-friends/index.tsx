import * as styles from './styles.css';

export const SearchMyFriends = () => {
  return (
    <div className={styles.InputWrapper}>
      <input className={styles.Input} placeholder="Please enter your friend's nickname." />
    </div>
  );
};
