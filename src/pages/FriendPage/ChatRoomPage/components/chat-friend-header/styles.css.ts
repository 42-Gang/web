import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const header = style({
  ...theme.layout.rowBetween,
  minHeight: rem(60),
  paddingInline: rem(20),
});

export const profile = style({
  ...theme.layout.center,
  gap: rem(20),
});

export const avatar = style({
  width: rem(42),
  height: rem(42),
  borderRadius: '50%',
  objectFit: 'cover',
  flexShrink: 0,
});

export const nickname = style({
  color: theme.color.white,
  fontSize: rem(24),
  letterSpacing: rem(2),
});

export const blockToggle = style({
  ...theme.layout.center,
  position: 'relative',
  width: rem(110),
  height: rem(40),
  color: theme.color.white,
  fontSize: rem(18),
  background: `url('/assets/images/base-button-normal.png') no-repeat center`,
  backgroundSize: 'contain',
  zIndex: theme.zIndex.default,

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      opacity: 0,
      pointerEvents: 'none',
      background: "url('/assets/images/base-button-hover.png') center/contain no-repeat",
      zIndex: theme.zIndex.behind,
    },
    '&:hover::after': { opacity: 1 },
    '&[data-selected="true"]::after': { opacity: 1 },
  },
});

globalStyle(`${blockToggle} > span`, { transform: `translateY(-${rem(2)})` });
