import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { rem, theme } from '@/styles';

export const branding = style({
  marginTop: theme.size.brandingTopMargin,
});

export const gun = recipe({
  base: {
    position: 'absolute',
    width: rem(268),
    height: rem(268),
    top: rem(100),
    userSelect: 'none',
  },
  variants: {
    side: {
      left: {
        left: rem(40),
      },
      right: {
        right: rem(40),
        transform: 'scaleX(-1)',
      },
    },
  },
});

export const license = style({
  marginBottom: rem(36),
});
