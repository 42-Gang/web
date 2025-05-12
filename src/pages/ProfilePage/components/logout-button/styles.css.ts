import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const button = style({
  ...theme.layout.center,
  width: rem(420),
  height: rem(53),
  color: theme.color.lose,
  fontSize: rem(27),
  border: `${rem(2)} solid white`,
  borderRadius: rem(25),
  background: 'transparent',
  transition: 'background 250ms ease, color 250ms ease',
  gap: rem(32),

  ':hover': {
    background: theme.color.white,
    color: theme.color.lose,
  },
});
