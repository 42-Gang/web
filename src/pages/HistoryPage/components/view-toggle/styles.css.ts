import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const button = style({
  ...theme.layout.center,
  position: 'relative',
  width: rem(200),
  height: rem(45),
  color: theme.color.white,
  fontFamily: "'Tiny5', sans-serif",
  fontSize: rem(23),
  background: "url('/assets/images/base-button-normal.png') center/contain no-repeat",
  backgroundColor: 'transparent',
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
      zIndex: theme.zIndex.default,
    },
    '&:hover::after': { opacity: 1 },
    '&[data-selected="true"]::after': { opacity: 1 },
  },
});

globalStyle(`${button} span`, {
  zIndex: theme.zIndex.hover,
});
