import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const license = style({
  width: '100%',
  color: theme.color.white,
  fontFamily: theme.fontFamily.license,
  fontSize: rem(15),
  textAlign: 'center',
  letterSpacing: rem(4),
  lineHeight: 1.8,
});
