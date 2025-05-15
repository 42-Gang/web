import { keyframes, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const userCard = style({
  width: rem(200),
  height: rem(340),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: rem(20),
});

export const playerColor = style({
  backgroundColor: theme.color.playerCard,
});

export const opponentColor = style({
  backgroundColor: theme.color.opponentCard,
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
