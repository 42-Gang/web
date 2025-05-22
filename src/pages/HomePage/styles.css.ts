import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const branding = style({
  marginTop: theme.size.brandingTopMargin,
});

export const gunLeft = style({
  position: 'absolute',
  width: rem(268),
  height: rem(268),
  top: rem(100),
  left: rem(40),
});

export const gunRight = style({
  position: 'absolute',
  width: rem(268),
  height: rem(268),
  top: rem(100),
  right: rem(40),
  transform: 'scaleX(-1)',
});

export const license = style({
  marginBottom: rem(36),
});
