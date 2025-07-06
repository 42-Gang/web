import type { VerticalPosition, HorizontalVariant, TournamentRoundType } from '@/api';

import * as styles from './styles.css.ts';
import { TOURNAMENT_ROUNDS, WINNER_POSITIONS, PLAYER_POSITIONS } from '../../constants';

type MatchLinesProps = {
  winner: VerticalPosition;
  variant?: HorizontalVariant;
  highlight?: boolean;
  shouldRender?: boolean;
  round?: TournamentRoundType;
  isTwoPlayer?: boolean;
};

export const MatchLines = ({
  winner,
  variant,
  highlight = true,
  shouldRender = true,
  round = TOURNAMENT_ROUNDS.SEMI_FINAL,
  isTwoPlayer = false,
}: MatchLinesProps) => {
  if (!shouldRender) return null;

  if (isTwoPlayer) {
    return (
      <div className={styles.horizontalLinesWrapper}>
        <div className={styles.horizontalLineCenter} />
        {highlight && <div className={styles.horizontalLineCenterHighlight} />}
      </div>
    );
  }

  const verticalHighlight =
    winner === WINNER_POSITIONS.TOP ? styles.topHighlight : styles.bottomHighlight;

  const shouldShowHorizontal = round === TOURNAMENT_ROUNDS.FINAL;

  return (
    <div className={styles.linesWrapper}>
      <div className={styles.verticalLine} />
      {highlight && <div className={verticalHighlight} />}

      {shouldShowHorizontal &&
        variant &&
        (variant === PLAYER_POSITIONS.LEFT ? (
          <>
            <div className={styles.horizontalLineLeft} />
            {highlight && <div className={styles.horizontalLineLeftHighlight} />}
          </>
        ) : variant === PLAYER_POSITIONS.RIGHT ? (
          <>
            <div className={styles.horizontalLineRight} />
            {highlight && <div className={styles.horizontalLineRightHighlight} />}
          </>
        ) : null)}
    </div>
  );
};
