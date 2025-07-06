import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const branding = style({
  marginTop: theme.size.brandingTopMargin,
});

export const license = style({
  marginBottom: rem(36),
});
