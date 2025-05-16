import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const title = style({
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: 'Tiny5, sans-serif',
  fontSize: rem(50),
  textAlign: 'center',
});

export const matchArea = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const vs = style({
  color: theme.color.white,
  fontFamily: 'Tiny5, sans-serif',
  fontSize: rem(60),
  marginLeft: rem(80),
  marginRight: rem(80),
});
