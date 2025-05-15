import { keyframes, style } from '@vanilla-extract/css';

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

export const playerCard = style({
  width: rem(200),
  height: rem(340),
  backgroundColor: theme.color.playerCard,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: rem(20),
});

export const opponentCard = style({
  width: rem(200),
  height: rem(340),
  backgroundColor: theme.color.opponentCard,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: rem(20),
});

export const avatar = style({
  width: rem(120),
  height: rem(120),
  borderRadius: '50%',
  backgroundColor: theme.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const spinner = style({
  width: rem(40),
  height: rem(40),
  animation: `${spin} ${theme.animation.spinnerSlow}`,
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const gun = style({
  width: rem(110),
  height: rem(110),
});

export const gunReversed = style([
  gun,
  {
    transform: 'scaleX(-1)',
  },
]);

export const nickname = style({
  color: theme.color.white,
  fontSize: rem(20),
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
