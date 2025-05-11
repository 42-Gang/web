import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const button = style({
  position: 'absolute',
  top: rem(5),
  left: rem(5),
  width: rem(32),
  height: rem(32),
  opacity: 0.6,
  transition: 'opacity 200ms ease',
  background: 'url("/assets/images/back-button.svg")',

  ':hover': { opacity: 1 },
});
