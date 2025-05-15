import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const title = style({
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: 'Tiny5',
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
  fontFamily: 'Tiny5',
  fontSize: rem(60),
  marginLeft: rem(80),
  marginRight: rem(80),
});

export const waiting = style({
  fontFamily: 'Tiny5',
  marginTop: rem(30),
  textAlign: 'center',
  fontSize: rem(40),
});

export const waitingPending = style({
  color: theme.color.waiting,
});

export const waitingMatched = style({
  color: theme.color.matched,
});
