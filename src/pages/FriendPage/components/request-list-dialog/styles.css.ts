import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const fixedDialogContent = style({
  width: rem(700),
  minHeight: rem(430),
  padding: rem(24),
  borderRadius: rem(12),
});
