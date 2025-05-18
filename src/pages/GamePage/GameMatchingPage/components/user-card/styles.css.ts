import { styleVariants, keyframes, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const userCard = styleVariants({
  '1vs1': {
    width: rem(200),
    height: rem(340),
    backgroundColor: theme.color.playerCard,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: rem(16),
    position: 'relative',
    flexShrink: 0,
  },
  tournament: {
    width: rem(170),
    height: rem(340),
    backgroundColor: theme.color.playerCard,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: rem(16),
    position: 'relative',
    flexShrink: 0,
  },
});

export const playerColor = style({
  backgroundColor: theme.color.playerCard,
});

export const opponentColor = style({
  backgroundColor: theme.color.opponentCard,
});

export const hostBorder = style({
  boxShadow: `0 0 0 ${rem(4)} ${theme.color.yellow}`,
});

export const avatarWrapper = style({
  position: 'relative',
  width: rem(120),
  height: rem(140),
  display: 'flex',
  justifyContent: 'center',
});

export const avatar = style({
  width: rem(120),
  height: rem(120),
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: theme.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const masterLabel = style({
  position: 'absolute',
  top: rem(122),
  fontSize: rem(16),
  fontFamily: 'Tiny5',
  color: theme.color.yellow,
  textAlign: 'center',
  width: '100%',
});

export const gunWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: rem(110),
});

export const gun = style({
  width: rem(110),
  height: rem(110),
  objectFit: 'contain',
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
  textAlign: 'center',
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

export const addButton = style({
  width: rem(60),
  height: rem(60),
  background: "url('/assets/images/invite-friend.svg') center/contain no-repeat",
});

export const fixedDialogContent = style({
  width: rem(495),
  minHeight: rem(385),
  padding: rem(24),
  borderRadius: rem(12),
});
