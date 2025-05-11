import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const navigation = style({
  ...theme.layout.center,
  color: theme.color.white,
  fontFamily: `'Tiny5', sans-serif`,
  fontSize: rem(32),
});

export const list = style({
  ...theme.layout.columnCenterY,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  minWidth: rem(200),
});

export const item = style({
  ...theme.layout.centerX,
  width: '100%',
});

export const button = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  paddingBlock: rem(2),
  paddingInline: rem(8),
  lineHeight: 1.2,
});

export const indicatorWrapper = style({
  ...theme.layout.center,
  position: 'absolute',
  left: rem(-30),
  top: '50%',
  transform: 'translateY(-50%)',
  width: '1em',
  height: '1em',
  pointerEvents: 'none',
});

export const indicator = style({
  display: 'inline-block',
  color: theme.color.white,
  fontSize: rem(24),
  lineHeight: 1,
  opacity: 0,
  transform: `translateX(${rem(-6)})`,
  transition: `opacity 250ms ease-in-out, transform 250ms ease-in-out`,
  backfaceVisibility: 'hidden',
});

export const indicatorActive = style({
  opacity: 1,
  transform: `translateX(0)`,
});

export const text = style({
  textAlign: 'center',
});
