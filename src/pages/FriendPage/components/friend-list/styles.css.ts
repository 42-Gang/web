import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const item = style({
  ...theme.layout.rowBetween,
  width: '100%',
  paddingBlock: rem(14),
  paddingInline: rem(18),
});
