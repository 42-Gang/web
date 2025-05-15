import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const waiting = style({
  fontFamily: 'Tiny5',
  marginTop: rem(30),
  textAlign: 'center',
  fontSize: rem(40),
});

export const pending = style({
  color: theme.color.waiting,
});

export const matched = style({
  color: theme.color.matched,
});
