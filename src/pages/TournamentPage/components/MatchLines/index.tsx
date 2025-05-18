import * as styles from './styles.css';

type MatchLinesProps = {
  winner: 'top' | 'bottom';
  variant?: 'left' | 'right';
};

export const MatchLines = ({ winner, variant = 'left' }: MatchLinesProps) => {
  const verticalHighlight = winner === 'top' ? styles.topHighlight : styles.bottomHighlight;

  return (
    <div className={styles.linesWrapper}>
      {variant === 'left' ? (
        <>
          <div className={styles.verticalLine} />
          <div className={verticalHighlight} />
          <div className={styles.horizontalLineLeft} />
          <div className={styles.horizontalLineLeftHighlight} />
        </>
      ) : (
        <>
          <div className={styles.horizontalLineRight} />
          <div className={styles.horizontalLineRightHighlight} />
          <div className={styles.verticalLine} />
          <div className={verticalHighlight} />
        </>
      )}
    </div>
  );
};
