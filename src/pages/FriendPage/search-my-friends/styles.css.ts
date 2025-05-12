import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const InputWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
});

export const Input = style({
  width: rem(430),
  height: rem(46),
  fontSize: rem(18),
  borderRadius: rem(15),
  textAlign: 'center',
});
