import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const divider = style({
  width: '100%',
  height: rem(1),
  border: 'none',
  backgroundColor: theme.color.white,
});
