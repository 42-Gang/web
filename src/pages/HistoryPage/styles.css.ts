import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const title = style({
  marginTop: rem(10),
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(30),
  textAlign: 'center',
  lineHeight: 1.2,
});
