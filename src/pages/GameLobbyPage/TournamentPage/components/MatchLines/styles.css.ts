import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

const baseLine = {
  position: 'absolute',
  height: rem(2),
} as const;

const baseVertical = {
  position: 'absolute',
  width: rem(2),
  left: '50%',
  transform: 'translateX(-50%)',
} as const;

export const linesWrapper = style({
  position: 'relative',
  width: rem(64),
  height: rem(80),
  marginTop: rem(-40),
});

export const horizontalLinesWrapper = style({
  position: 'relative',
  width: rem(100),
  height: rem(20),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const verticalLine = style({
  ...baseVertical,
  height: rem(128),
  top: rem(-4),
  backgroundColor: theme.color.white,
});

export const topHighlight = style({
  ...baseVertical,
  height: rem(64),
  top: rem(-4),
  backgroundColor: theme.color.yellow,
});

export const bottomHighlight = style({
  ...baseVertical,
  height: rem(64),
  bottom: rem(-4),
  backgroundColor: theme.color.yellow,
});

export const horizontalLineCenter = style({
  ...baseLine,
  width: rem(80),
  backgroundColor: theme.color.white,
});

export const horizontalLineCenterHighlight = style({
  ...baseLine,
  width: rem(80),
  backgroundColor: theme.color.yellow,
});

export const horizontalLineLeft = style({
  ...baseLine,
  width: rem(96),
  top: rem(60),
  left: '50%',
  backgroundColor: theme.color.white,
});

export const horizontalLineLeftHighlight = style({
  ...baseLine,
  width: rem(96),
  top: rem(60),
  left: '50%',
  backgroundColor: theme.color.yellow,
});

export const horizontalLineRight = style({
  ...baseLine,
  width: rem(80),
  top: rem(60),
  right: '50%',
  backgroundColor: theme.color.white,
});

export const horizontalLineRightHighlight = style({
  ...baseLine,
  width: rem(80),
  top: rem(60),
  right: '50%',
  backgroundColor: theme.color.yellow,
});
