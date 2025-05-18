import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const fixedDialogContent = style({
  width: rem(495),
  minHeight: rem(385),
  padding: rem(24),
  borderRadius: rem(12),
});
