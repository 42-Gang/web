import { style } from '@vanilla-extract/css';

import { theme, rem } from '@/styles';

export const branding = style({
  color: theme.color.brand,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(60),
  textAlign: 'center',
  lineHeight: 1.2,
});
