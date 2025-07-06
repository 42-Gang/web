import * as styles from './styles.css';

export const SemiFinalDecoration = () => {
  return (
    <div className={styles.centerDecoration}>
      <img
        src="/assets/images/tournament-arrow.png"
        alt="Arrow Left"
        className={styles.arrowLeft}
      />
      <img
        src="/assets/images/tournament-placeholder-ball.png"
        alt="Mystery Ball"
        className={styles.questionImage}
      />
      <img
        src="/assets/images/tournament-arrow.png"
        alt="Arrow Right"
        className={styles.arrowRight}
      />
    </div>
  );
};
