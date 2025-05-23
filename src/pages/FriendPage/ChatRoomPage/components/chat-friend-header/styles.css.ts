import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: rem(15),
});

export const profile = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
  paddingLeft: rem(12),
});

export const avatar = style({
  width: rem(70),
  height: rem(70),
  marginRight: rem(20),
  borderRadius: '50%',
  objectFit: 'cover',
  flexShrink: 0,
});

export const nickname = style({
  color: theme.color.white,
  marginRight: rem(30),
  fontSize: rem(28),
  textTransform: 'uppercase',
  letterSpacing: rem(2),
});

export const blockButton = style({
  ...theme.layout.center,
  position: 'relative',
  width: rem(110),
  height: rem(40),
  marginRight: rem(20),
  marginTop: rem(30),
  color: theme.color.white,
  fontSize: rem(18),
  background: `url('/assets/images/base-button-normal.png') no-repeat center`,
  backgroundSize: 'contain',
  transition: 'opacity 250ms ease',
  zIndex: theme.zIndex.default,

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 250ms ease',
      background: "url('/assets/images/base-button-hover.png') center/contain no-repeat",
      zIndex: theme.zIndex.behind,
    },
    '&:hover::after': { opacity: 1 },
    '&[data-selected="true"]::after': { opacity: 1 },
  },
});

export const buttonText = style({
  transform: `translateY(-${rem(2)})`,
});
