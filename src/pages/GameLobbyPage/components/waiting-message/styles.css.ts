import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const waiting = style({
  fontFamily: 'Tiny5, sans-serif',
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

export const readyContainer = style({
  marginTop: rem(30),
  display: 'flex',
  justifyContent: 'center',
});

export const startButton = style({
  fontFamily: 'Tiny5',
  fontSize: rem(28),
  padding: `${rem(7)} ${rem(24)}`,
  backgroundColor: 'black',
  color: theme.color.matched,
  border: `${rem(2)} solid ${theme.color.white}`,
  borderRadius: rem(8),
  transition: 'transform 0.2s ease',

  selectors: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
});
