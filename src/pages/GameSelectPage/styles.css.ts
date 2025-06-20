import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const imagePath = {
  ONE_VS_ONE: '/assets/images/1vs1.png',
  TOURNAMENT: '/assets/images/tournament.png',
};

export const branding = style({
  marginTop: theme.size.brandingTopMargin,
  marginBottom: rem(20),
});

export const buttonWrapper = style({
  marginTop: rem(28),
  marginBottom: rem(49),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: rem(42),
});

export const autoCustomButton = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: rem(310),
  height: rem(63),
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(15),
  color: theme.color.white,
  fontSize: rem(35),
  background: 'transparent',
  transition: 'all 0.3s ease',

  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      left: rem(-120),
      top: '50%',
      transform: 'translateY(-50%)',
      width: rem(113),
      height: rem(56),
      background: "url('/assets/images/bullet.svg') center/contain no-repeat",
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
    },

    '&:hover::before': {
      opacity: 1,
    },
    '&:hover': {
      background: theme.color.autoCustomHover,
      color: theme.color.yellow,
    },

    '&[data-current="true"]::before': {
      opacity: 1,
    },
    '&[data-current="true"]': {
      background: theme.color.autoCustomHover,
      color: theme.color.yellow,
    },
  },
});

export const modeWrapper = style({
  display: 'flex',
  gap: rem(42),
  justifyContent: 'center',
  marginBottom: rem(25),
});

export const vsButton = style({
  position: 'relative',
  width: rem(220),
  height: rem(220),
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(30),
  overflow: 'hidden',
  ...theme.layout.columnCenter,

  selectors: {
    '&::after': {
      content: "''",
      position: 'absolute',
      inset: 0,
      backgroundColor: theme.color.autoCustomHover,
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
      borderRadius: rem(15),
    },
    '&:hover::after': {
      opacity: 1,
    },
  },
});

export const tournamentButton = style({
  position: 'relative',
  width: rem(220),
  height: rem(220),
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(30),
  overflow: 'hidden',
  ...theme.layout.columnCenter,

  selectors: {
    '&::after': {
      content: "''",
      position: 'absolute',
      inset: 0,
      backgroundColor: theme.color.autoCustomHover,
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
      borderRadius: rem(15),
    },
    '&:hover::after': {
      opacity: 1,
    },
  },
});

export const license = style({
  marginBottom: rem(36),
});

export const buttonImage = style({
  width: rem(180),
  height: rem(180),
  objectFit: 'contain',
  marginTop: rem(16),
});

export const buttonText = style({
  fontSize: rem(30),
  color: theme.color.yellow,
  marginTop: rem(-6),
});
