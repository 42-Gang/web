import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  paddingTop: theme.size.brandingTopMargin,
  paddingBottom: rem(36),
  color: theme.color.white,
});

export const license = style({
  marginBottom: rem(36),
});

export const branding = style({
  marginTop: theme.size.brandingTopMargin,
});

export const loadingText = style({
  fontFamily: theme.fontFamily.license,
});
