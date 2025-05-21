import type { VerticalPosition, HorizontalVariant, TournamentRoundType } from '@/api/types/game';

import * as styles from './styles.css';


type MatchLinesProps = {
  winner: VerticalPosition;
  variant?: HorizontalVariant;
  highlight?: boolean;
  shouldRender?: boolean;
  round?: TournamentRoundType;
};

export const MatchLines = ({
  winner,
  variant,
  highlight = true,
  shouldRender = true,
  round = 'ROUND_4',
}: MatchLinesProps) => {
  if (!shouldRender) return null;

  const verticalHighlight = winner === 'top' ? styles.topHighlight : styles.bottomHighlight;

  const shouldShowHorizontal = round === 'ROUND_2';

  return (
    <div className={styles.linesWrapper}>
      <div className={styles.verticalLine} />
      {highlight && <div className={verticalHighlight} />}

      {shouldShowHorizontal && variant === 'left' && (
        <>
          <div className={styles.horizontalLineLeft} />
          {highlight && <div className={styles.horizontalLineLeftHighlight} />}
        </>
      )}

      {shouldShowHorizontal && variant === 'right' && (
        <>
          <div className={styles.horizontalLineRight} />
          {highlight && <div className={styles.horizontalLineRightHighlight} />}
        </>
      )}
    </div>
  );
};
