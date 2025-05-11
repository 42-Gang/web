import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const container = style({
  display: 'flex',
  marginTop: rem(20),
  fontFamily: `'Tiny5', sans-serif`,
  fontSize: rem(60),
  textAlign: 'center',
  gap: rem(8),
});
