import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const summary = style({
  marginTop: rem(20),
  fontFamily: `'Tiny5', sans-serif`,
  fontSize: rem(60),
  textAlign: 'center',
});
