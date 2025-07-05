import type { VerticalPosition, HorizontalVariant, TournamentRoundType } from '@/api';

import * as styles from './styles.css.ts';

const TOURNAMENT_ROUNDS = {
  FINAL: 'ROUND_2',
  SEMI_FINAL: 'ROUND_4',
} as const;

const WINNER_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

const PLAYER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type MatchLinesProps = {
  winner: VerticalPosition;
  variant?: HorizontalVariant;
  highlight?: boolean;
  shouldRender?: boolean;
  round?: TournamentRoundType;
  isTwoPlayer?: boolean;
};

type LineHighlightStyle = {
  topHighlight: string;
  bottomHighlight: string;
};

const getHighlightStyles = (): LineHighlightStyle => ({
  topHighlight: styles.topHighlight,
  bottomHighlight: styles.bottomHighlight,
});

const shouldDisplayHorizontalLines = (round: TournamentRoundType): boolean => {
  return round === TOURNAMENT_ROUNDS.FINAL;
};

const renderHorizontalLines = (
  variant: HorizontalVariant,
  highlight: boolean,
  styles: typeof import('./styles.css.ts'),
) => {
  if (variant === PLAYER_POSITIONS.LEFT) {
    return (
      <>
        <div className={styles.horizontalLineLeft} />
        {highlight && <div className={styles.horizontalLineLeftHighlight} />}
      </>
    );
  }

  if (variant === PLAYER_POSITIONS.RIGHT) {
    return (
      <>
        <div className={styles.horizontalLineRight} />
        {highlight && <div className={styles.horizontalLineRightHighlight} />}
      </>
    );
  }

  return null;
};

const renderDuelModeLines = (highlight: boolean) => {
  return (
    <div className={styles.horizontalLinesWrapper}>
      <div className={styles.horizontalLineCenter} />
      {highlight && <div className={styles.horizontalLineCenterHighlight} />}
    </div>
  );
};

const renderTournamentModeLines = (
  winner: VerticalPosition,
  variant: HorizontalVariant | undefined,
  highlight: boolean,
  round: TournamentRoundType,
) => {
  const highlightStyles = getHighlightStyles();
  const verticalHighlight =
    winner === WINNER_POSITIONS.TOP
      ? highlightStyles.topHighlight
      : highlightStyles.bottomHighlight;

  const shouldShowHorizontal = shouldDisplayHorizontalLines(round);

  return (
    <div className={styles.linesWrapper}>
      <div className={styles.verticalLine} />
      {highlight && <div className={verticalHighlight} />}

      {shouldShowHorizontal && variant && renderHorizontalLines(variant, highlight, styles)}
    </div>
  );
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
    return renderDuelModeLines(highlight);
  }

  return renderTournamentModeLines(winner, variant, highlight, round);
};
